import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styles: [require('./login.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	public userName: string;

	constructor(private authService: AuthService) {
	}

	public onLogin() {
		this.authService.Login(this.userName);
	}
}
