import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { CourseDurationComponent } from './duration.component';
import { AuthorsService } from './../../services/authors.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Authors } from './../../models';
import * as moment from 'moment';

describe('CourseAuthorsComponent', () => {
	let fixture: ComponentFixture<CourseDurationComponent>;
	let component: CourseDurationComponent;
	let onChange: jasmine.Spy;
	let onTouched: jasmine.Spy;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [CourseDurationComponent],
			providers: [
				// {provide: AuthorsService,
				// useClass: class {public getList(): Observable<Authors[]> {return Observable.of(authors); }}},
				{provide: 'moment', useValue: moment}],
			schemas: [NO_ERRORS_SCHEMA]
		}).createComponent(CourseDurationComponent);

		component = fixture.componentInstance;
		onChange = spyOn(component as any, 'onChange');
		onTouched = spyOn(component as any, 'onTouched');
	});


	it('create instance', () => {
		expect(component).toBeTruthy();
	});

	it('setValue proper value', () => {
		component.setValue({target: {value: 100}});

		expect((component as any).onChange).toHaveBeenCalled();
		expect((component as any).onTouched).toHaveBeenCalled();
	});

	it('writeValue with value', () => {
		component.writeValue(100);
		expect(component.duration).toEqual(100);
	});

	it('writeValue without value', () => {
		component.writeValue(NaN);
		expect(component.duration).toBeNaN();
	});
});
