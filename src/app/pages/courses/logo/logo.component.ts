import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'courselogo',
	templateUrl: 'logo.component.html',
	styles: [require('./logo.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
 	// @Input() public todo: LogoItem;

	constructor() {
	}
}
