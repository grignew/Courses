import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod, XHRBackend, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthorizedHttp extends Http {

	constructor(_backend: XHRBackend, _defaultOptions: RequestOptions) {
		super(_backend, _defaultOptions);
	}

	public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
		let fakeToken = localStorage.getItem('fakeToken');
		console.log('AuthorizedHttp ', fakeToken, url);
		if (typeof url === 'string') {
			if (!options) {
				options = {headers: new Headers()};
			}
			options.headers.set('Authorization', `${fakeToken}`);
		} else {
		url.headers.set('Authorization', `${fakeToken}`);
		}
		console.log('AuthorizedHttp ', url, options);
		return super.request(url, options);
	}
}
