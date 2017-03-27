import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'bread-crumb',
	templateUrl: 'bread-crumb.component.html',
	styles: [require('./bread-crumb.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbComponent {
	@Input() public breadcrumb: string;

	constructor() {
		this.breadcrumb = 'Courses';
	}

}
