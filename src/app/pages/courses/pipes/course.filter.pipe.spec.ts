import { TestBed, inject } from '@angular/core/testing';
import { CourseFilterPipe } from './course.filter.pipe';
import { FormControl } from '@angular/forms';
import { Course } from './../models/course.models';
import * as moment from 'moment';


describe('CourseFilterPipe', () => {
	let filterCourse: string = 'Video course 3';
	let coursesInit: Course[] =  [
							{
								id: 3,
								name: 'Video course 3',
								description: 'test course 2',
								duration: 48,
								date: moment().subtract(1, 'days').toDate(),
								topRated: true,
								authors: null
							},
							{
								id: 2,
								name: 'Video course 2',
								description: 'test course 1',
								duration: 48,
								date: moment().subtract(2, 'days').toDate(),
								topRated: false,
								authors: null
							},
							{
								id: 1,
								name: 'Video course 1',
								description: 'test course',
								duration: 378,
								date: moment().subtract(3, 'days').toDate(),
								topRated: false,
								authors: null
							}
						];

	it('should create an instance', () => {
		const pipe = new CourseFilterPipe(moment);
		expect(pipe).toBeTruthy();
	});

	it ('should filter value', () => {
		const pipe = new CourseFilterPipe(moment);

		expect(pipe.transform(coursesInit, filterCourse)
			.map((course) => course.name)).toEqual([filterCourse]);

		expect(pipe.transform(coursesInit, '').length).toEqual(3);
	});

});
