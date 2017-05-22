// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Course } from './../models/course.models';

export const COURSES = 'Get Courses';
export const COURSES_COMPLETE = 'Courses Complete';
export const FOUND_COURSES_COMPLETE = 'Get Found Courses Complete';
export const FIND_COURSES = 'Find Courses';
export const DELETE_COURSE = 'Delete course';
export const ADD_COURSE = 'Add Course';
export const UPDATE_COURSE = 'Update Course';
export const CHANGE_COMPLETE = 'Change courses complete';
export const GET_COURSE = 'Get Course';
export const GET_COURSE_COMPLETE = 'Get Course complete';

export class Courses implements Action {
	public readonly type = COURSES;
}
export class FindCourses implements Action {
	public readonly type = FIND_COURSES;
}
export class FoundCoursesComplete implements Action {
	public readonly type = FOUND_COURSES_COMPLETE;

	constructor(public payload: Course[]) {}
}

export class CoursesComplete implements Action {
	public readonly type = COURSES_COMPLETE;

	constructor(public payload: Course[]) {}
}

export class DeleteCourse implements Action {
	public readonly type = DELETE_COURSE;

	constructor(public payload: number) {}
}

export class AddCourse implements Action {
	public readonly type = ADD_COURSE;

	constructor(public payload: Course) {}
}

export class UpdateCourse implements Action {
	public readonly type = UPDATE_COURSE;

	constructor(public payload: Course) {}
}

export class ChangeCourseComplete implements Action {
	public readonly type = CHANGE_COMPLETE;
}

export class GetCourse implements Action {
	public readonly type = GET_COURSE;

	constructor(public payload: number) {}
}

export class GetCourseComplete implements Action {
	public readonly type = GET_COURSE_COMPLETE;

	constructor(public payload: Course) {}
}

export type Actions = Courses
	| CoursesComplete
	| DeleteCourse
	| AddCourse
	| UpdateCourse
	| FoundCoursesComplete
	| FindCourses
	| ChangeCourseComplete
	| GetCourse
	| GetCourseComplete;

