import { Injectable } from '@angular/core';

import { Course } from './../models';
import { Courses } from './mock.courses';

@Injectable()
export class CourseService {
	private courseList: Course[];

	constructor() {
		this.courseList = Courses;
	}

	public getList(): Course[] {
		return this.courseList;
	}

	public createCourse(course: Course) {
		this.courseList.push(course);
	}

	public GetItem(id: number): Course {
		return this.courseList.find((course) => course.id === id);
	}

	public updateItem(course: Course) {
		this.courseList.splice(this.courseList.findIndex((courseIn) => courseIn.id === course.id),
								1,
								course);
	}

	public removeItem(id: number) {
		this.courseList.splice(this.courseList.findIndex((course) => course.id === id), 1);
	}

}
