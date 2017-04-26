import { Component, ViewEncapsulation, Input, Output } from '@angular/core';
import { EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../models';

@Component({
	selector: 'course-item',
	templateUrl: 'course-item.component.html',
	styles: [require('./course-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
	@Input() public course: Course;
	@Output() public onDeleteCourseEvent = new EventEmitter<Course>();

	constructor() {
	}

	public onDeleteCourse() {
		this.onDeleteCourseEvent.emit(this.course);
	}
}
