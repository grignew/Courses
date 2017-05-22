import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { DateValidatorDirective } from './date.validator.directive';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';


describe('DateValidatorDirective', () => {
	// let component: DateValidatorDirective;
	// let fixture: ComponentFixture<DateValidatorDirective>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DateValidatorDirective]
		}).compileComponents();
	});

	it('should create an instance', () => {
		let component = new DateValidatorDirective(moment);
		expect(component).toBeTruthy();
	});

	it ('should validate value', () => {
		let component = new DateValidatorDirective(moment);
		let val = new FormControl();
		val.setValue(new Date());
		expect(component.validate(val)).toBeNull();
	});

	it ('should invalidate value', () => {
		let component = new DateValidatorDirective(moment);
		let val = new FormControl();
		val.setValue('eeeeeee');
		expect(component.validate(val)).toEqual({ invalidDate: true });
	});
});
