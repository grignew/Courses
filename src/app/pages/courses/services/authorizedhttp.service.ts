import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod, XHRBackend, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthorizedHttp extends Http {

	private token: string;

	public set updateToken(value: string) {
		this.token = value;
		console.log('set token=', value);
		if (value) {
			localStorage.setItem('fakeToken', value);
		}else {
			localStorage.removeItem('fakeToken');
		}
	}

	public get updateToken() {
		return this.token;
	}

	constructor(_backend: XHRBackend, _defaultOptions: RequestOptions) {
		super(_backend, _defaultOptions);
		this.token = localStorage.getItem('fakeToken');
	}

	public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
		console.log('token=', this.token);
		if (typeof url === 'string') {
			if (!options) {
				options = {headers: new Headers()};
			}
			options.headers.set('Authorization', `${this.token}`);
		} else {
		url.headers.set('Authorization', `${this.token}`);
		}
		return super.request(url, options);
	}
}
