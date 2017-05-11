import { combineReducers, ActionReducer } from '@ngrx/store';
import * as auth from './auth.reducer';
import * as course from './course.reducer';

export interface State {
	auth: auth.State;
	course: course.State;
}

const reducers = {
	auth: auth.reducer,
	course: course.reducer
};

const prodReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return prodReducer(state, action);
}
