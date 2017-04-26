import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod } from '@angular/http';
import { AuthorizedHttp } from './authorizedhttp.service';
import { Authors } from './../models';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class AuthorsService {
	public authors: Authors[];
	private urlServer = 'http://localhost:3004';

	constructor(private http: AuthorizedHttp) {
	}

	public getList(): Observable<Authors[]> {
		return this.http.get(`${this.urlServer}/authors`, {})
		.map((req) => req.json())
		.map((authors) => authors.map((author) => new Authors(author)));
	}
}
