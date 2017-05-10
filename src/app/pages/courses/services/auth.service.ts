import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod } from '@angular/http';
import { AuthUser } from './../models/auth.model';
import { AuthorizedHttp } from './authorizedhttp.service';
import { Store } from '@ngrx/store';
import { State } from './../reducers';
import * as auth from './../actions/auth.action';

@Injectable()
export class AuthService {
	private urlServer = 'http://localhost:3004';

	constructor(private http: AuthorizedHttp, private store: Store<State>) {
		if (this.http.updateToken) {
			this.GetUserInfo().subscribe((authUser: AuthUser) => {
				this.store.dispatch(new auth.LoginComplete(authUser));
			});
		}
	}

	public Login(userLogin: string, userPass: string): Observable<AuthUser> {
		let body = {
			login: userLogin,
			password: userPass
		};
		return this.http.post(`${this.urlServer}/auth/login`, body, {})
		.map((req) => {
			this.http.updateToken = req.json().token;
			return req.ok;
		})
		.switchMap(() => this.GetUserInfo());
	}

	public Logout() {
		this.http.updateToken = '';
	}

	public GetUserInfo(): Observable<AuthUser> {
		return this.http.post(`${this.urlServer}/auth/userinfo`, {}, {})
		.map((response) => response.json())
		.map((user) => {
			return new AuthUser(user);
		});
	}
}
