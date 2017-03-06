import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'copyright',
	templateUrl: 'copyright.component.html',
	styles: [require('./copyright.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CopyrightComponent {

	constructor() {
	}

}
