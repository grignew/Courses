import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { CourseService } from './../services/course.maintain.service';
import * as course from './../actions/course.action';
import { Response } from '@angular/http';

@Injectable()
export class CourseEffect {
	@Effect()
	public courses$: Observable<Action> = this.actions$
		.ofType(course.COURSES)
		.map(toPayload)
		.switchMap(() => {
			return this.courseService.getList()
				.map((courses) => new course.CoursesComplete(courses));
		});

	@Effect()
	public findCourses$: Observable<Action> = this.actions$
		.ofType(course.FIND_COURSES)
		.map(toPayload)
		.switchMap(() => {
			this.courseService.startCourses = 0;
			return this.courseService.getList()
				.map((courses) => new course.FoundCoursesComplete(courses));
		});

	@Effect()
	public deleteCourse$: Observable<Action> = this.actions$
		.ofType(course.DELETE_COURSE)
		.map(toPayload)
		.switchMap((id: number) => {
			return this.courseService.removeItem(id)
				.switchMap(() => {
					this.courseService.startCourses = 0;
					return this.courseService.getList();
				})
				.map((courses) => new course.FoundCoursesComplete(courses));
		});

	@Effect()
	public updateCourse$: Observable<Action> = this.actions$
		.ofType(course.UPDATE_COURSE)
		.map(toPayload)
		.switchMap((curCourse) => {
			return this.courseService.updateItem(curCourse)
				.map(() => new course.ChangeCourseComplete());
		});

	@Effect()
	public addCourse$: Observable<Action> = this.actions$
		.ofType(course.ADD_COURSE)
		.map(toPayload)
		.switchMap((curCourse) => {
			return this.courseService.addItem(curCourse)
				.map(() => new course.ChangeCourseComplete());
		});

	@Effect()
	public getCourse$: Observable<Action> = this.actions$
	.ofType(course.GET_COURSE)
	.map(toPayload)
	.switchMap((id: number) => {
		return this.courseService.GetItem(id)
			.map((curCourse) => {
				console.log('effect curcourse=', curCourse);
				return new course.GetCourseComplete(curCourse);
			});
	});
	constructor(private actions$: Actions, private courseService: CourseService) {}
}
