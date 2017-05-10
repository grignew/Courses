import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { State } from './reducers';

@Injectable()
export class CanActivateGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<State>) {
	}

	public canActivate() {
		// console.log('this.authService.IsAuthenticated=', this.authService.IsAuthenticated());
		return this.store.select((state) => state.auth).first()
		.map((authUser) => {
			if (!authUser.authUser) {
				this.router.navigateByUrl('/login');
				return false;
			}
			return true;
		});
		// if (!this.authService.IsAuthenticated()) {
		// 	this.router.navigateByUrl('/login');
		// 	return false;
		// }
		// return true;
	}
}
