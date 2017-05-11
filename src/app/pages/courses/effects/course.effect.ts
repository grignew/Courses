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

	// @Effect()
	// public logout$: Observable<Action> = this.actions$
	// 	.ofType(auth.LOGOUT)
	// 	.switchMap(() => {
	// 		this.authService.Logout();
	// 		return Observable.of(new auth.LogoutComplete());
	// 	});

	constructor(private actions$: Actions, private courseService: CourseService) {}
}
