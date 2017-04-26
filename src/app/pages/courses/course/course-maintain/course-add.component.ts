import { Component, ViewEncapsulation, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadCrumbService } from '../../services/breadcrumb.service';
import { BreadCrumb, Course, Authors } from '../../models';
import { NgForm } from '@angular/forms';
import { CourseService } from './../../services/course.maintain.service';

@Component ({
	selector: 'course-add',
	templateUrl: 'course-add.component.html',
	styles: [require('./course-add.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
})
export class AddCourseComponent implements AfterViewInit, OnInit {
	@ViewChild('form') public userForm: NgForm;
	public course: Course; // = {} as Course;

	public courseDuration: number;
	public authors: Authors[];
	private courseId: number = -1;
	private breadCrumbItem: BreadCrumb = { name: 'Add Course', path: '/addcourse'};
	private coursesBreadCrumbItem: BreadCrumb = {name: 'Courses', path: '/courses'};

	constructor(
		private breadCrumbService: BreadCrumbService,
		private route: ActivatedRoute,
		private courseService: CourseService
	) {
		route.params.subscribe((p) => {
			this.courseId = +p['id'];
			if (this.courseId === -1) {
				this.course = new Course({});
			}else {
				this.course = this.courseService.GetItem(this.courseId);
			}
		});
	}

	public ngOnInit() {
	}

	public submit(form) {
		console.dir(form.value);
        /*if (!this.nameExists(form.value.person.name)) {
            this.value = form.value;
            this.people.push(deepCopy(form.value));
            form.reset();
        } else {
            alert('Already exists');
        }*/
	}

	public onSave() {
		console.log('save course');
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
