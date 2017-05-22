import { TestBed, inject } from '@angular/core/testing';
import { CourseDurationPipe } from './course.duration.pipe';
import { FormControl } from '@angular/forms';
import { Course } from './../models/course.models';
import * as moment from 'moment';


describe('CourseDurationPipe', () => {

	beforeEach(() => {
	TestBed.configureTestingModule({
		declarations: [CourseDurationPipe]
		}).compileComponents();
	});

	it('should create an instance', () => {
		const pipe = new CourseDurationPipe();
		expect(pipe).toBeTruthy();
	});

	it ('should validate value', () => {
		const pipe = new CourseDurationPipe();

		expect(pipe.transform(null)).toEqual('');
		expect(pipe.transform(NaN)).toEqual('');
		expect(pipe.transform(3)).toEqual('3min');
		expect(pipe.transform(61)).toEqual('1h 1min');
	});

});
