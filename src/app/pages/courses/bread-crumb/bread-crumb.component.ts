import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
// import { BreadCrumbService } from '../services/breadcrumb.service';

@Component({
	selector: 'bread-crumb',
	templateUrl: 'bread-crumb.component.html',
	styles: [require('./bread-crumb.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbComponent {
	@Input() public breadCrumb: string;

	constructor(/*private breadCrumbService: BreadCrumbService*/) {
		// this.breadcrumb = 'Courses';
		// this.breadCrumbService.getMenuItem.subscribe((menuItem) => this.breadCrumbList = menuItem);
	}

}
