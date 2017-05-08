import { Component, ViewEncapsulation, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadCrumbService } from '../../services/breadcrumb.service';
import { BreadCrumb, Course, Authors } from '../../models';
import { NgForm } from '@angular/forms';
import { CourseService } from './../../services/course.maintain.service';
import { Subscription } from 'rxjs/Rx';
import moment from 'moment';

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
	private courseItemSubscriber: Subscription;

	constructor(
		private breadCrumbService: BreadCrumbService,
		private route: ActivatedRoute,
		private courseService: CourseService,
		private router: Router
	) {
		route.params.subscribe((p) => {
			this.courseId = +p['id'];
			console.log('courseId', this.courseId);
			this.course = new Course({});
			if (this.courseId) {
				this.courseItemSubscriber = this.courseService.GetItem(this.courseId).subscribe(
					(course) => {
						this.course = course;
						// this.courseDate = moment(course.date).format('DD/MM/YYYY');
						this.breadCrumbItem = {name: this.course.name, path: '' };
						this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
						console.dir('get course', this.course);
					});
			} else {
				console.log('Course id is nan');
				this.breadCrumbItem = { name: 'New Course', path: ''};
				this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
			}
		});
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
		if (this.courseItemSubscriber) {
			this.courseItemSubscriber.unsubscribe();
		}
	}
	public submit(form) {
		// console.log(form.value);
		// this.course.date = moment(this.courseDate, 'DD/MM/YYYY').toDate();
		// console.log('this.course.date', this.course.date);
		if (this.courseId) {
			this.courseService.updateItem(this.course).subscribe((res) => {
				console.log('navigate when exist course id');
				this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
				this.router.navigateByUrl('/courses');
			});
		}else {
			this.courseService.addItem(this.course).subscribe((res) => {
				console.log('navigate when not exist course id');
				this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
				this.router.navigateByUrl('/courses');
			});
		}
	}

	public onSave() {
		this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
	}

	public onCancel() {
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
