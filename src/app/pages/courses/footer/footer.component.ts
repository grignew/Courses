import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'footer',
	templateUrl: 'footer.component.html',
	styles: [require('./footer.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

	constructor() {
	}

}
