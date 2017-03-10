import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'course-search',
	templateUrl: 'course-search.component.html',
	styles: [require('./course-search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseSearchComponent {
	public findCourse: string;

	constructor() {
	}

	public onSearch() {
		console.log(this.findCourse);
	}
}
