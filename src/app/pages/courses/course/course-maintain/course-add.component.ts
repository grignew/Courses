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
			if (this.courseId !== -1) {
				this.courseItemSubscriber = this.courseService.GetItem(this.courseId).subscribe(
					(course) => {
						this.course = course;
						this.courseDate = moment(course.date).format('DD/MM/YYYY');
						console.dir('get course', this.course);
					});
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
		console.log(form.value);
		this.course.date = moment(this.courseDate, 'DD/MM/YYYY').toDate();
		console.log('this.course.date', this.course.date);
		if (this.courseId !== -1) {
			this.courseService.updateItem(this.course).subscribe((res) => {
				this.router.navigateByUrl('/courses');
			});
		}else {
			this.courseService.addItem(this.course).subscribe((res) => {
				this.router.navigateByUrl('/courses');
			});
		}
	}

	public onSave() {
		console.log('save course');
		this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
	}

	public onCancel() {
		console.log('cancel course');
		this.breadCrumbService.removeBreadCrumb(this.breadCrumbItem);
	}

	public onDurationKeyDown(event: KeyboardEvent) {
		console.log(event.code, event);
		if (event.key === '.' || event.key === ',') {
			event.preventDefault();
		}
	}

	public ngAfterViewInit() {
		console.log('ngAfterViewInit add course');
		this.breadCrumbService.setBreadCrumbLeaf(this.coursesBreadCrumbItem);
		this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
	}
}
