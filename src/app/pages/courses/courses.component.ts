import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Course, BreadCrumb } from './models';
import { Subscription, Observer } from 'rxjs/Rx';
import { CourseService } from './services/course.maintain.service';
import { AuthService } from './services/auth.service';
import { LoadRunnerService } from './services/loadrunner.service';
import { CourseSearchComponent } from './course-search/course-search.component';
import { BreadCrumbService } from './services/breadcrumb.service';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy, AfterViewInit {
	public isShownDeleteConfirmation: boolean;
	public isLoadRunnerShow: boolean = false;
	public courseList: Course[];
	private deleteCourse: Course;
	private loadRunnerServiceSubscriber: Subscription;
	private courseServiceFilterSubscriber: Subscription;
	private courseServiceGetListSubscriber: Subscription;
	private breadCrumbItem: BreadCrumb = {name: 'Courses', path: '/courses'};

	constructor(
				private courseService: CourseService,
				// private authService: AuthService,
				private loadRunnerService: LoadRunnerService,
				private cdRef: ChangeDetectorRef,
				private breadCrumbService: BreadCrumbService
				) {
		console.log('Courses constructor');
	}

	public ngOnInit() {
		console.log('Courses init');
		this.courseServiceGetListSubscriber = this.courseService.getList()
		.map((courses) => {
			courses.forEach((course, i, courases) => course.name = `${course.name}_`);
			return courses;
		})
		.subscribe((data) => this.courseList = data);
		this.loadRunnerServiceSubscriber = this.loadRunnerService.isShow.subscribe((data) => {
			this.isLoadRunnerShow = data;
			this.cdRef.markForCheck();
		});
		this.courseServiceFilterSubscriber = this.courseService.getFilterCourses.subscribe((data) => {
			console.log(data);
			this.courseList = data;
			this.cdRef.markForCheck();
		});
	}

	public onDeleteCourse(course: Course) {
		console.log(`Delete Course ${course.name}!`);
		this.deleteCourse = course;
		this.isShownDeleteConfirmation = true;
	}

	public onDeleteConfirmationCourse(isConfirmDelete: boolean) {
		if (isConfirmDelete) {
			this.loadRunnerService.Show();
			this.courseService.removeItem(this.deleteCourse.id)
							.subscribe((data) => {if (data) {
								this.loadRunnerService.Hide();
								this.courseService.filterCourses(/*this.courseService.getList()*/''); }
							});
		}
		this.isShownDeleteConfirmation = false;
	}

	public ngOnDestroy() {
		// unsubscribe here
		this.loadRunnerServiceSubscriber.unsubscribe();
		this.courseServiceFilterSubscriber.unsubscribe();
		this.courseServiceGetListSubscriber.unsubscribe();
		console.log('ngOnDestroy');
	}

	// public ngOnChanges() {
	// 	console.log('ngOnChanges');
	// }

	// public ngDoCheck() {
	// 	console.log('ngDoCheck');
	// }

	// public ngAfterContentInit() {
	// 	console.log('ngAfterContentInit');
	// }

	// public ngAfterContentChecked() {
	// 	console.log('ngAfterContentChecked');
	// }

	public ngAfterViewInit() {
		console.log('ngAfterViewInit courses');
		this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
	}

	// public ngAfterViewChecked() {
	// 	console.log('ngAfterViewChecked');
	// }
}
