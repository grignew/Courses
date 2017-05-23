import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AddCourseComponent } from './course-add.component';
import { BreadCrumbService } from '../../services/breadcrumb.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component, ViewEncapsulation, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectSignature } from '@ngrx/core';
import { State } from './../../reducers';
import * as courseAction from './../../actions/course.action';
import * as authAction from './../../actions/auth.action';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { reducer } from './../../reducers';
import * as route from './../../courses.routes';
import { Observable, Observer } from 'rxjs/Rx';
import { BreadCrumb, Course, Authors } from '../../models';
import * as courseRed from './../../reducers/course.reducer';

import { CourseDurationPipe } from './../../pipes/course.duration.pipe';

describe('AddCourseComponent', () => {
	let state: State = {
			auth: {authUser: null, error: ''},
			course: {courses: [], curCourse: new Course({id: 1, name: 'test'})}
			};
	let fixture: ComponentFixture<AddCourseComponent>;
	let component: AddCourseComponent;
	let breadCrumbServiceeMock: BreadCrumbService;
	let setBreadCrumbLeafSpy: jasmine.Spy;
	let removeBreadCrumbLeafSpy: jasmine.Spy;

	let activatedRouteMock: ActivatedRoute;

	let storeDispatch: jasmine.Spy;
	let storeSelect: jasmine.Spy;

	beforeEach(() => {
	fixture = TestBed.configureTestingModule({
			declarations: [AddCourseComponent, CourseDurationPipe],
			imports: [StoreModule.provideStore(reducer), FormsModule, RouterModule],
			providers: [BreadCrumbService,
			// {provide: Router, useClass: RouterModule},
			{provide: Router, useClass: class { public navigateByUrl = jasmine.createSpy('navigateByUrl'); }},
			{provide: ActivatedRoute,
				useClass: class {public params =  Observable.of({['id']: 1});}
			}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).createComponent(AddCourseComponent);
	component = fixture.componentInstance;
	});

	beforeEach(inject([ActivatedRoute], (activeatedRouter: ActivatedRoute) => {
		activatedRouteMock = activeatedRouter;
		activeatedRouter.params = Observable.of({['id']: 1});
		fixture.detectChanges();
	}));

	beforeEach(inject([BreadCrumbService], (service: BreadCrumbService) => {
		breadCrumbServiceeMock = service;
		setBreadCrumbLeafSpy = spyOn(breadCrumbServiceeMock, 'setBreadCrumbLeaf');
		removeBreadCrumbLeafSpy = spyOn(breadCrumbServiceeMock, 'removeBreadCrumb');
	}));

	beforeEach(inject([Store], (store: Store<State>) => {
		storeDispatch = spyOn(store, 'dispatch');
		storeSelect = spyOn(store, 'select');
		storeSelect.and.returnValue(Observable.of(state.course, state.course));
	}));

	beforeEach(inject([Router], (router: Router) => {
		// spyOn(router, 'navigateByUrl');
	}));

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('should create an instance for edit', () => {
		activatedRouteMock.params = Observable.of({['id']: 1});
		component.ngOnInit();
		fixture.detectChanges();

		expect(setBreadCrumbLeafSpy).toHaveBeenCalled();
	});

	it('should create an instance for add', () => {
		activatedRouteMock.params = Observable.of({['id']: ''});
		component.ngOnInit();
		fixture.detectChanges();

		expect(setBreadCrumbLeafSpy).toHaveBeenCalled();
	});

	it('save form', () => {
		component.onSave();
		expect(removeBreadCrumbLeafSpy).toHaveBeenCalled();
	});

	it('cancel form', () => {
		component.onCancel();
		expect(removeBreadCrumbLeafSpy).toHaveBeenCalled();
		expect(storeDispatch).toHaveBeenCalledWith(new courseAction.ChangeCourseComplete());
	});

	it('After Init form', () => {
		component.ngAfterViewInit();
		expect(setBreadCrumbLeafSpy).toHaveBeenCalled();
	});

	it('submit new course', () => {
		activatedRouteMock.params = Observable.of({['id']: ''});
		component.ngOnInit();
		component.submit({});
		fixture.detectChanges();

		expect(storeDispatch).toHaveBeenCalledWith(new courseAction.AddCourse(new Course({})));
	});

	it('submit add course', () => {
		activatedRouteMock.params = Observable.of({['id']: 1});
		component.ngOnInit();
		component.submit({});
		fixture.detectChanges();

		expect(storeDispatch).toHaveBeenCalledWith(new courseAction.UpdateCourse(state.course.curCourse));
		expect(removeBreadCrumbLeafSpy).toHaveBeenCalled();
	});
});
