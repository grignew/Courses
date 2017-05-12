import { Component, ViewEncapsulation, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadCrumbService } from '../../services/breadcrumb.service';
import { BreadCrumb, Course, Authors } from '../../models';
import { NgForm } from '@angular/forms';
import { CourseService } from './../../services/course.maintain.service';
import { Subscription } from 'rxjs/Rx';
import moment from 'moment';
import { Store } from '@ngrx/store';
import { State } from './../../reducers';
import * as courseAction from './../../actions/course.action';

@Component ({
	selector: 'course-add',
	templateUrl: 'course-add.component.html',
	styles: [require('./course-add.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
})
export class AddCourseComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild('form') public userForm: NgForm;
	public course: Course; // = {} as Course;

	public courseDuration: number;
	public authors: Authors[];
	public courseDate: string = '';
	private courseId: number = -1;
	private breadCrumbItem: BreadCrumb = { name: 'Add Course', path: '/courses'};
	private coursesBreadCrumbItem: BreadCrumb = {name: 'Courses', path: '/courses'};
	// private courseItemSubscriber: Subscription;

	constructor(
		private breadCrumbService: BreadCrumbService,
		private route: ActivatedRoute,
		// private courseService: CourseService,
		private router: Router,
		private store: Store<State>
	) {
		route.params.subscribe((p) => {
			this.courseId = +p['id'];
			this.course = new Course({});
			if (this.courseId) {
				this.store.dispatch(new courseAction.GetCourse(this.courseId));
				this.store.select((state: State) => state.course).skip(1).first()
					.map((stateCourses) => stateCourses.curCourse)
					.subscribe((curCourse) => {
						this.course = curCourse;
						this.breadCrumbItem = {name: this.course.name, path: '' };
						this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
					});
				// this.courseItemSubscriber = this.courseService.GetItem(this.courseId).subscribe(
				// 	(course) => {
				// 		this.course = course;
				// 		this.breadCrumbItem = {name: this.course.name, path: '' };
				// 		this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
				// 	});
			} else {
				this.breadCrumbItem = { name: 'New Course', path: ''};
				this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
			}
		});
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
		// if (this.courseItemSubscriber) {
		// 	this.courseItemSubscriber.unsubscribe();
		// }
	}
	public submit(form) {
		if (this.courseId) {
			this.store.dispatch(new courseAction.UpdateCourse(this.course));
			// this.courseService.updateItem(this.course).subscribe((res) => {
			// 	this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
			// 	this.router.navigateByUrl('/courses');
			// });
		}else {
			this.store.dispatch(new courseAction.AddCourse(this.course));
			// this.courseService.addItem(this.course).subscribe((res) => {
			// 	this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
			// 	this.router.navigateByUrl('/courses');
			// });
		}
		this.store.select((state: State) => state.course).skip(1).first()
			.subscribe(() => {
				this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
				this.router.navigateByUrl('/courses');
			});
	}

	public onSave() {
		this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
	}

	public onCancel() {
		this.store.dispatch(new courseAction.ChangeCourseComplete());
		this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
	}

	public onDurationKeyDown(event: KeyboardEvent) {
		console.log(event.code, event);
		if (event.key === '.' || event.key === ',') {
			event.preventDefault();
		}
	}

	public ngAfterViewInit() {
		this.breadCrumbService.setBreadCrumbLeaf(this.coursesBreadCrumbItem);
	}
}
