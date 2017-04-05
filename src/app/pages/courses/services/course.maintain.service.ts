import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Course } from './../models';
import { Courses } from './mock.courses';
import { CourseFilterPipe } from '../pipes/course.filter.pipe';

@Injectable()
export class CourseService {
	public filterString: string;
	private courseList: Course[];
	private filteredCourses: Subject<Course[]> = new Subject();
	private courseFilter = new CourseFilterPipe();

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
	public filterCourses(filterString: string) {
		// this.filterString = filterString;
		console.log('method filterCourses = ' + filterString);
		return this.filteredCourses.next(this.courseFilter.transform(this.getList(), this.filterString));
	}
}
