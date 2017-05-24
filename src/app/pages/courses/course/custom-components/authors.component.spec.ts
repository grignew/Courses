import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { CourseAuthorsComponent } from './authors.component';
import { AuthorsService } from './../../services/authors.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Authors } from './../../models';

describe('CourseAuthorsComponent', () => {
	let authors: Authors[] = [{firstName: 'test', id: 1, lastName: 'test'}];
	let fixture: ComponentFixture<CourseAuthorsComponent>;
	let component: CourseAuthorsComponent;
	let onChange: jasmine.Spy;
	let onTouched: jasmine.Spy;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [CourseAuthorsComponent],
			providers: [
				{provide: AuthorsService,
				useClass: class {public getList(): Observable<Authors[]> {return Observable.of(authors); }}
				}],
			schemas: [NO_ERRORS_SCHEMA]
		}).createComponent(CourseAuthorsComponent);

		component = fixture.componentInstance;
		component.ngOnInit();
		component.courseAuthors = [];
		onChange = spyOn(component as any, 'onChange');
		onTouched = spyOn(component as any, 'onTouched');
	});

	it('create instance', () => {
		expect(component).toBeTruthy();
	});

	it('checkAuthorsList', () => {
		component.courseAuthors.push(authors[0]);
		fixture.detectChanges();

		expect(component.checkAuthorsList(1)).toEqual(true);
	});

	it('changeAuthor add author', () => {
		component.changeAuthor(authors[0], {target: {checked: true}});
		expect(component.checkAuthorsList(1)).toEqual(true);
		expect((component as any).onChange).toHaveBeenCalled();
		expect((component as any).onTouched).toHaveBeenCalled();
	});

	it('changeAuthor remove author', () => {
		component.changeAuthor(authors[0], {target: {checked: true}});
		component.changeAuthor(authors[0], {target: {checked: false}});
		expect(component.checkAuthorsList(1)).toEqual(false);
		expect((component as any).onChange).toHaveBeenCalled();
		expect((component as any).onTouched).toHaveBeenCalled();
	});

	it('writeValue with authors', () => {
		component.writeValue(authors);
		expect(component.courseAuthors.length).toEqual(1);
	});

	it('writeValue without authors', () => {
		component.writeValue(NaN);
		expect(component.courseAuthors).toEqual([]);
	});
});
