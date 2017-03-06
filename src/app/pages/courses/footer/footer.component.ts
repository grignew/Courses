import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'footer',
	templateUrl: 'footer.component.html',
	styles: [require('./footer.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class FooterComponent {

	constructor() {
	}

}
