import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { CourseFilterPipe } from '../pipes/course.filter.pipe';
import { Observable, Observer, Subject } from 'rxjs/Rx';
import { CourseService } from '../services/course.maintain.service';
import { Course } from './../models';
import { Store } from '@ngrx/store';
import { State } from './../reducers';
import * as course from './../reducers/course.reducer';
import * as courseAction from './../actions/course.action';

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

	constructor(
		private courseService: CourseService,
		private store: Store<State>
		) {
	}

	public onSearch() {
		this.courseService.filterString = this.findCourse;
		this.store.dispatch(new courseAction.FindCourses());
		// this.courseService.filterCourses(this.findCourse);
		// console.log('onSearch = ' + this.findCourse);
	}

	public runOnEmpty() {
		if (this.findCourse.length === 0) {
			this.onSearch();
		}
	}

	public onHandleKeyUp(event: KeyboardEvent) {
		console.log(event.keyCode);
		if (event.keyCode === 13 && this.findCourse.length > 0)	{
			this.onSearch();
		}
	}

	public onAddCourse() {
	}
}
