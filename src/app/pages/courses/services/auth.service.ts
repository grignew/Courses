import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod } from '@angular/http';
import { AuthUser } from './../models/auth.model';

@Injectable()
export class AuthService {
	private subjectUserInfo = new ReplaySubject<AuthUser>(1);
	private userName: string;
	private urlServer = 'http://localhost:3004';
	private fakeToken: string = '';
	private userInfo: AuthUser;

	constructor(private http: Http) {
		this.fakeToken = localStorage.getItem('fakeToken');
		this.subjectUserInfo.next(this.userInfo);
	}

	public Login(userLogin: string, userPass: string): Observable<boolean> {
		let body = {
			login: userLogin,
			password: userPass
		};
		return this.http.post(`${this.urlServer}/auth/login`, body, {})
		.map((req) => {
			this.fakeToken = req.json().token;
			localStorage.setItem('fakeToken', this.fakeToken);
			console.log(this.fakeToken);
			return req.ok;
		});
	}

	public Logout() {
		this.fakeToken = '';
		localStorage.removeItem('fakeToken');
		this.userName = '';
		this.subjectUserInfo.next(this.userInfo);
	}

	public IsAuthenticated(): boolean {
		return !!this.fakeToken;
	}

	public GetUserInfo(): Observable<AuthUser> {
		console.log(`test user info ${this.fakeToken}`);
		let options = {
			headers: new Headers({ Authorization: this.fakeToken})
		};
		return this.http.post(`${this.urlServer}/auth/userinfo`, {}, options)
		.map((response) => response.json())
		.map((user) => {
			return new AuthUser(user);
		});
	}
}
