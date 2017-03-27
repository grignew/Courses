import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()
export class AuthService {
	private isAuth: boolean = true;
	private userName: string;

	constructor() {
		this.userName = localStorage.getItem('userName');
	}

	public Login(userName: string) {
		this.isAuth = true;
		localStorage.setItem('userName', userName);
		this.userName = userName;
		// console.log(`Login=${this.isAuth}`);
	}

	public Logout() {
		this.isAuth = false;
		localStorage.removeItem('userName');
		this.userName = '';
		// console.log(`Logout=${this.isAuth}`);
	}

	public IsAuthenticated(): boolean {
		// console.log(`IsAuthenticated=${this.isAuth}`);
		return this.isAuth;
	}

	public GetUserInfo(): Observable<string> {
		return Observable.of(this.userName);
	}
}
