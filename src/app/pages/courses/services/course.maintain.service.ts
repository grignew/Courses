import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Course } from './../models';
import { Courses } from './mock.courses';
import { CourseFilterPipe } from '../pipes/course.filter.pipe';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod } from '@angular/http';
import { AuthorizedHttp } from './authorizedhttp.service';

@Injectable()
export class CourseService {
	public filterString: string = '';
	public courseList: Course[];
	private filteredCourses: Subject<Course[]> = new Subject();
	private courseFilter = new CourseFilterPipe();
	private urlServer = 'http://localhost:3004';
	private amountCourses: number;
	private countCourses: number = 10;
	private startCourses: number = 1;

	constructor(private http: AuthorizedHttp) {
		this.courseList = Courses;
	}

	public getList(): Observable<Course[]> {
		let param = new URLSearchParams();
		param.set('start', `${this.startCourses}`);
		param.set('count', `${this.countCourses}`);
		param.set('filter', `${this.filterString}`);
		let options = {
			search: param
		};
		console.log(`filter test ${this.filterString}`);
		return this.http.get(`${this.urlServer}/courses`, options)
		.map((req) => req.json())
		.map((courses) => courses.map((course) => new Course(course)));
	}

	public AddMore() {
		this.startCourses += this.countCourses;
		this.getList();
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
		return this.http.delete(`${this.urlServer}/courses/${id}`, {})
		.map((res) => true);
	}

	public get getFilterCourses(): Observable<Course[]> {
		return this.filteredCourses;
	}
	public filterCourses(filterString: string) {
		console.log('method filterCourses = ' + filterString);
		this.getList().subscribe((courses) => this.filteredCourses.next(courses));
	}
}
