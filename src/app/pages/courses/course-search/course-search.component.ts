import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'course-search',
	templateUrl: 'course-search.component.html',
	styles: [require('./course-search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseSearchComponent {
 	// @Input() public todo: LogoItem;

	constructor() {
	}
}