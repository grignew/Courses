import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router) {
	}

	public canActivate() {
		console.log('this.authService.IsAuthenticated=', this.authService.IsAuthenticated());
		if (!this.authService.IsAuthenticated()) {
			this.router.navigateByUrl('/login');
			return false;
		}
		return true;
	}
}
