// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Credential } from './../models/credential.model';
import { AuthUser } from './../models/auth.model';

export const LOGIN = 'Login';
export const LOGIN_COMPLETE = 'Login Complete';
export const LOGIN_FAIL = 'Login Fail';
export const LOGOUT = 'Logout';
export const LOGOUT_COMPLETE = 'Logout Complete';
export const IS_AUTHENTIFICATED = 'Is Authentificated';
export const GET_USER_INFO = 'Get User Info';

export class Login implements Action {
	public readonly type = LOGIN;

	constructor(public payload: Credential) {}
}

export class LoginComplete implements Action {
	public readonly type = LOGIN_COMPLETE;

	constructor(public payload: AuthUser) {}
}

export class LoginFail implements Action {
	public readonly type = LOGIN_FAIL;

	constructor(public payload: string) {}
}

export class Logout implements Action {
	public readonly type = LOGOUT;
}

export class LogoutComplete implements Action {
	public readonly type = LOGOUT_COMPLETE;
}

export type Actions = Login | Logout | LoginComplete | LoginFail | LogoutComplete;

