import { TestBed, inject } from '@angular/core/testing';
import { AuthorsValidatorDirective } from './authors.validator.directive';
import { FormControl } from '@angular/forms';
import { Authors } from './../models';


describe('AuthorsValidatorDirective', () => {
	let authors: Authors[] = [
		{id: 1
		, firstName: 'test1'
		, lastName: 'test2'
	}];

	beforeEach(() => {
	TestBed.configureTestingModule({
		declarations: [AuthorsValidatorDirective]
		}).compileComponents();
	});

	it('should create an instance', () => {
		const directive = new AuthorsValidatorDirective();
		expect(directive).toBeTruthy();
	});

	it ('should validate value', () => {
		const directive = new AuthorsValidatorDirective();
		let val = new FormControl();
		val.setValue(authors);
		expect(directive.validate(val)).toBeNull();
	});

	it ('should invalidate value', () => {
		const directive = new AuthorsValidatorDirective();
		let val = new FormControl();
		val.setValue([]);
		expect(directive.validate(val)).toEqual({ invalidAuthors: true });
	});
});
