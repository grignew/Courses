import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class LoadRunnerService {
	private _isShow = new ReplaySubject(1); // Subject<boolean> = new Subject();

	constructor() {
	}

	get isShow(): Observable<boolean> {
		return this._isShow;
	}

	public Show() {
		this._isShow.next(true);
	}

	public Hide() {
		this._isShow.next(false);
	}
}
