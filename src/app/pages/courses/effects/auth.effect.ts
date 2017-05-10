import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './../services/auth.service';
import * as auth from './../actions/auth.action';
import { Credential } from './../models/credential.model';
import { Response } from '@angular/http';

@Injectable()
export class AuthEffect {
	@Effect()
	public login$: Observable<Action> = this.actions$
		.ofType(auth.LOGIN)
		.map(toPayload)
		.switchMap((credential: Credential) => {
			return this.authService.Login(credential.login, credential.password)
				.map((userInfo) => new auth.LoginComplete(userInfo))
				.catch((error: Response) => Observable.of(new auth.LoginFail(error.text())));
		});

	@Effect()
	public logout$: Observable<Action> = this.actions$
		.ofType(auth.LOGOUT)
		.switchMap(() => {
			this.authService.Logout();
			return Observable.of(new auth.LogoutComplete());
		});

	constructor(private actions$: Actions, private authService: AuthService) {}
}
