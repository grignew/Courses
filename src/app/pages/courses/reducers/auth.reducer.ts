import { AuthUser } from './../models/auth.model';
import * as auth from './../actions/auth.action';

export interface State {
	authUser: AuthUser;
	error: string;
}

export function reducer(state: State = {} as any, action: auth.Actions): State {
	switch (action.type) {
		case auth.LOGIN_COMPLETE: return {authUser: action.payload, error: undefined};
		case auth.LOGIN_FAIL: return {authUser: undefined, error: action.payload};
		case auth.LOGOUT_COMPLETE: return {authUser: undefined, error: undefined};
		default: return state;
	}
}
