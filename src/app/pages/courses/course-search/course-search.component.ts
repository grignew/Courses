import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { CourseFilterPipe } from '../pipes/course.filter.pipe';
import { Observable, Observer, Subject } from 'rxjs/Rx';
import { CourseService } from '../services/course.maintain.service';

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
	private courseFilter = new CourseFilterPipe();

	constructor(private courseService: CourseService) {
	}

	public onSearch() {
		this.courseService.filterString = this.findCourse;
		this.courseService.filterCourses(this.findCourse
			/*this.courseFilter.transform(this.courseService.getList(), this.findCourse)*/);
		console.log('onSearch = ' + this.findCourse);
	}

	public runOnEmpty() {
		if (this.findCourse.length === 0) {
			this.onSearch();
		}
	}

	public onAddCourse() {
	}
}
