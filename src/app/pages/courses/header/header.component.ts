import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'header',
	templateUrl: 'header.component.html',
	// styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

	constructor() {
	}

}
