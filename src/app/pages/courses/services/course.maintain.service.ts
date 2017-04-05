import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Course } from './../models';
import { Courses } from './mock.courses';

@Injectable()
export class CourseService {
	private courseList: Course[];
	private filteredCourses: Subject<Course[]> = new Subject();

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

	public removeItem(id: number): Observable<boolean> {
		return Observable.create((observer) => {
			setTimeout(() => {
				this.courseList.splice(
				this.courseList.findIndex((course) => course.id === id), 1);
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	public get getFilterCourses(): Observable<Course[]> {
		return this.filteredCourses;
	}
	public filterCourses(courses: Course[]) {
		console.log('method filterCourses = ' + courses);
		return this.filteredCourses.next(courses);
	}
}
