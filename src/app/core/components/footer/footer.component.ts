import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'main-footer',
	templateUrl: './footer.component.html',
	styles: [require('./footer.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
	constructor() {

	}
}
