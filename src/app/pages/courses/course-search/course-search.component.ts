import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'course-search',
	templateUrl: 'course-search.component.html',
	styles: [require('./course-search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSearchComponent {
	public findCourse: string;

	constructor() {
	}

	public onSearch() {
		console.log(this.findCourse);
	}
}
