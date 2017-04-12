import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class AuthService {
	private subjectUserInfo = new ReplaySubject(1);
	private isAuth: boolean = true;
	private userName: string;

	constructor() {
		this.userName = localStorage.getItem('userName');
		this.subjectUserInfo.next(this.userName);
	}

	public Login(userName: string): Observable<boolean> {
		return Observable.create((observer) => {
			setTimeout(() => {
				this.isAuth = true;
				localStorage.setItem('userName', userName);
				this.userName = userName;
				this.subjectUserInfo.next(this.userName);
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	public Logout() {
		this.isAuth = false;
		localStorage.removeItem('userName');
		this.userName = '';
		this.subjectUserInfo.next(this.userName);
		// console.log(`Logout=${this.isAuth}`);
	}

	public IsAuthenticated(): boolean {
		// console.log(`IsAuthenticated=${this.isAuth}`);
		return this.isAuth;
	}

	public GetUserInfo(): Observable<string> {
		return this.subjectUserInfo;
	}
}
