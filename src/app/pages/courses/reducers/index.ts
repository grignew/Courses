import { combineReducers, ActionReducer } from '@ngrx/store';
import * as auth from './auth.reducer';

export interface State {
	auth: auth.State;
}

const reducers = {
	auth: auth.reducer
};

const prodReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return prodReducer(state, action);
}
