import { TestBed, inject } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs/Rx';
// import { ScalarObservable } from 'rxjs/ScalarObservable';
import { AuthService } from './auth.service';
import { AuthorizedHttp } from './authorizedhttp.service';
import { XHRBackend, RequestOptions, Http, HttpModule,
	ConnectionBackend, Response, ResponseOptions,
	ResponseOptionsArgs } from '@angular/http';
import { Store } from '@ngrx/store';
import { StoreModule, combineReducers } from '@ngrx/store';
import { reducer } from './../reducers';
import { AuthUser } from './../models/auth.model';

describe('AuthService', () => {
	let authUser: AuthUser = new AuthUser({
			id: 1,
			fakeToken: 'tttt',
			name: null,
			login: 'test',
			password: 'test'});
	let authService: AuthService;
	let loginAuthServiceSpy: jasmine.Spy;
	let logoutAuthServiceSpy: jasmine.Spy;
	let getUSerInfoAuthServiceSpy: jasmine.Spy;

	let authorizedHttp: AuthorizedHttp;
	let updateTokenSpy: jasmine.Spy;

	let http: Http;
	let postHttp: jasmine.Spy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule, StoreModule.provideStore(reducer)],
			providers: [AuthService, AuthorizedHttp, Http, ConnectionBackend]
		});
	});

	// beforeEach(inject([AuthorizedHttp], (service: AuthorizedHttp) => {
	// 	AuthorizedHttp = service;
	// 	requestAuthorizedHttpSpy = spyOn(service, 'request');
	// 	requestAuthorizedHttpSpy.and.returnValue(Observable.of(new Response()));
	// 	requestAuthorizedHttpSpy = spy
	// }));

	beforeEach(inject([AuthService, AuthorizedHttp, Http],
		(service: AuthService, authorizedHttpService: AuthorizedHttp, httpService: Http) => {
		authService = service;
		// loginAuthServiceSpy = spyOn(service, 'Login');
		// loginAuthServiceSpy.and.returnValue(Observable.of(authUser));
		logoutAuthServiceSpy = spyOn(service, 'Logout');
		getUSerInfoAuthServiceSpy = spyOn(service, 'GetUserInfo');

		authorizedHttp = authorizedHttpService;
		postHttp = spyOn(authorizedHttp, 'post');

		http = httpService;
		// postHttp = spyOn(http, 'post');
	}));

	it('AuthService create', () => {
		expect(authService).toBeTruthy();
	});

	it('AuthService login', () => {
		postHttp.and.returnValue(Observable.of({ json: () => authUser }));
		getUSerInfoAuthServiceSpy.and.returnValue(Observable.of(authUser));
		let res = authService.Login('test', 'test');

		res.subscribe((res2) => expect(res2).toEqual(authUser));
	});

	it('AuthService logout', () => {
		expect(authService.Logout()).toBeUndefined();
	});

	it('AuthService getUserInfo', () => {
		postHttp.and.returnValue(Observable.of({json: () => authUser}));
		getUSerInfoAuthServiceSpy.and.callThrough();
		let res = authService.GetUserInfo();
		console.dir(res);
		res.subscribe((res2) => expect(res2).toEqual(authUser));
	});
});
