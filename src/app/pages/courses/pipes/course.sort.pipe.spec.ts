import { TestBed, inject } from '@angular/core/testing';
import { CourseSortPipe } from './course.sort.pipe';
import { FormControl } from '@angular/forms';
import { Course } from './../models/course.models';
import * as moment from 'moment';


describe('CourseSortPipe', () => {
	let coursesSorted: Course[] =  [
							{
								id: 1,
								name: 'Video course 1',
								description: 'test course',
								duration: 378,
								date: moment().subtract(3, 'days').toDate(),
								topRated: false,
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
								id: 3,
								name: 'Video course 3',
								description: 'test course 2',
								duration: 48,
								date: moment().subtract(1, 'days').toDate(),
								topRated: true,
								authors: null
							}
						];
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


	beforeEach(() => {
	TestBed.configureTestingModule({
		declarations: [CourseSortPipe]
		}).compileComponents();
	});

	it('should create an instance', () => {
		const pipe = new CourseSortPipe();
		expect(pipe).toBeTruthy();
	});

	it ('should validate value', () => {
		const pipe = new CourseSortPipe();

		expect(pipe.transform(coursesInit).map((course) => course.id)).toEqual([1, 2, 3]);
		expect(pipe.transform([{id: 1, date: new Date(2017, 2, 1, 1, 1, 1, 1)}, {id: 1, date: new Date(2017, 2, 1, 1, 1, 1, 1)}])
		.map((course) => course.id)).toEqual([1, 1]);
		expect(pipe.transform([{id: 1, date: new Date(2017, 1, 1)}, {id: 2, date: new Date(2017, 2, 1)}])
		.map((course) => course.id)).toEqual([1, 2]);
	});

});
