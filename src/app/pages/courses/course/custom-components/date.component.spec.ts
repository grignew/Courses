import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { CourseDateComponent } from './date.component';
import { AuthorsService } from './../../services/authors.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Authors } from './../../models';
import * as moment from 'moment';

describe('CourseAuthorsComponent', () => {
	let fixture: ComponentFixture<CourseDateComponent>;
	let component: CourseDateComponent;
	let onChange: jasmine.Spy;
	let onTouched: jasmine.Spy;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [CourseDateComponent],
			providers: [
				// {provide: AuthorsService,
				// useClass: class {public getList(): Observable<Authors[]> {return Observable.of(authors); }}},
				{provide: 'moment', useValue: moment}],
			schemas: [NO_ERRORS_SCHEMA]
		}).createComponent(CourseDateComponent);

		component = fixture.componentInstance;
		onChange = spyOn(component as any, 'onChange');
		onTouched = spyOn(component as any, 'onTouched');
	});


	it('create instance', () => {
		expect(component).toBeTruthy();
	});

	it('setValue proper value', () => {
		component.setValue({target: {value: '12/12/2017'}});

		expect((component as any).onChange).toHaveBeenCalled();
		expect((component as any).onTouched).toHaveBeenCalled();
	});

	it('setValue unproper value', () => {
		component.setValue({target: {value: '/12.12/2017'}});

		expect(onChange).toHaveBeenCalled();
		expect(onTouched).toHaveBeenCalled();
	});

	it('writeValue with value', () => {
		component.writeValue(new Date(12222));
		expect(component.date).toEqual(new Date(12222));
		expect(component.humanDate).toEqual(moment(new Date(12222)).format('DD/MM/YYYY'));
	});

	it('writeValue without value', () => {
		component.writeValue(NaN);
		expect(component.date).toBeNaN();
		expect(component.humanDate).toEqual('');
	});
});
