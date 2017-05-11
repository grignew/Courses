import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Course } from './../models';
// import { Courses } from './mock.courses';
import { CourseFilterPipe } from '../pipes/course.filter.pipe';
import { Http, Request, RequestOptions, Headers, Response } from '@angular/http';
import { URLSearchParams, RequestMethod } from '@angular/http';
import { AuthorizedHttp } from './authorizedhttp.service';

@Injectable()
export class CourseService {
	public filterString: string = '';
	public courseList: Course[];
	public countCourses: number = 2;
	public startCourses: number = 0;
	private filteredCourses: Subject<Course[]> = new Subject();
	private courseFilter = new CourseFilterPipe();
	private urlServer = 'http://localhost:3004';
	private amountCourses: number;

	constructor(private http: AuthorizedHttp) {
		// this.courseList = Courses;
	}

	public getList(): Observable<Course[]> {
		let param = new URLSearchParams();
		param.set('start', `${this.startCourses}`);
		param.set('count', `${this.countCourses}`);
		param.set('filter', `${this.filterString}`);
		let options = {
			search: param
		};
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

	public GetItem(id: number): Observable<Course> {
		// return this.courseList.find((course) => course.id === id);
		return this.http.get(`${this.urlServer}/courses/${id}`, {})
		.map((req) => req.json())
		.map((course) => new Course(course));
	}

	public updateItem(course: Course) {
		return this.http
		.put(`${this.urlServer}/courses/${course.id}`, course)
		.map((res) => res.json());
	}
	public addItem(course: Course) {
		return this.http
		.post(`${this.urlServer}/courses`, course)
		.map((res) => res.json());
	}
	public removeItem(id: number): Observable<boolean> {
		return this.http.delete(`${this.urlServer}/courses/${id}`, {})
		.map((res) => true);
	}

	public get getFilterCourses(): Observable<Course[]> {
		return this.filteredCourses;
	}
	public filterCourses(filterString: string) {
		this.startCourses = 0;
		this.getList().subscribe((courses) => this.filteredCourses.next(courses));
	}
}
