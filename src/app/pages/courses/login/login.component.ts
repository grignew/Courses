import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styles: [require('./login.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	public userName: string;

	constructor(private authService: AuthService) {
	}

	public onLogin() {
		this.authService.Login(this.userName);
	}
}
