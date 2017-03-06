import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styles: [require('./login.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

	constructor() {
	}

}
