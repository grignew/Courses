import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'courselogo',
	templateUrl: 'logo.component.html',
	styles: [require('./logo.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
 	// @Input() public todo: LogoItem;
	// public isAuth: boolean = true;

	constructor(private authService: AuthService) {
	}

	public onLogoff() {
		this.authService.Logout();
	}
}
