import { TestBed, inject } from '@angular/core/testing';
import { DurationValidatorDirective } from './duration.validator.directive';
import { FormControl } from '@angular/forms';


describe('DurationValidatorDirective', () => {
	beforeEach(() => {
	TestBed.configureTestingModule({
		declarations: [DurationValidatorDirective]
		}).compileComponents();
	});

	it('should create an instance', () => {
		const directive = new DurationValidatorDirective();
		expect(directive).toBeTruthy();
	});

	it ('should validate value', () => {
		const directive = new DurationValidatorDirective();
		let val = new FormControl();
		val.setValue(120);
		expect(directive.validate(val)).toBeNull();
	});

	it ('should invalidate value', () => {
		const directive = new DurationValidatorDirective();
		let val = new FormControl();
		val.setValue('eeeeeee');
		expect(directive.validate(val)).toEqual({ invalidDuration: true });
	});
});
