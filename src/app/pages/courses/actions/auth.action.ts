// tslint:disable:max-classes-per-file
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AuthUser } from './../models/auth.model';
import { Credential } from './../models/credential.model';

export const LOGIN = 'Login';
export const LOGIN_COMPLETE = 'Login Complete';
export const LOGIN_FAIL = 'Login Fail';
export const LOGOUT = 'Logout';
export const LOGOUT_COMPLETE = 'Logout Complete';
export const IS_AUTHENTIFICATED = 'Is Authentificated';
export const GET_USER_INFO = 'Get User Info';

@Injectable()
export class Login implements Action {
	public readonly type = LOGIN;

	constructor(public payload: Credential) {}
}

@Injectable()
export class LoginComplete implements Action {
	public readonly type = LOGIN_COMPLETE;

	constructor(public payload: AuthUser) {}
}

@Injectable()
export class LoginFail implements Action {
	public readonly type = LOGIN_FAIL;

	constructor(public payload: string) {}
}

@Injectable()
export class Logout implements Action {
	public readonly type = LOGOUT;
}

@Injectable()
export class LogoutComplete implements Action {
	public readonly type = LOGOUT_COMPLETE;
}

export type Actions = Login | Logout | LoginComplete | LoginFail | LogoutComplete;
