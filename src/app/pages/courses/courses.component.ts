import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Course, BreadCrumb } from './models';
import { Subscription, Observer } from 'rxjs/Rx';
import { CourseService } from './services/course.maintain.service';
import { AuthService } from './services/auth.service';
import { LoadRunnerService } from './services/loadrunner.service';
import { CourseSearchComponent } from './course-search/course-search.component';
import { BreadCrumbService } from './services/breadcrumb.service';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as courseAction from './actions/course.action';

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
	public courseList: Course[] = [];
	private deleteCourse: Course;
	private loadRunnerServiceSubscriber: Subscription;
	// private courseServiceFilterSubscriber: Subscription;
	private courseServiceGetListSubscriber: Subscription;
	private breadCrumbItem: BreadCrumb = {name: 'Courses', path: '/courses'};

	constructor(
				private courseService: CourseService,
				// private authService: AuthService,
				private store: Store<State>,
				private loadRunnerService: LoadRunnerService,
				private cdRef: ChangeDetectorRef,
				private breadCrumbService: BreadCrumbService
				) {
	}

	public ngOnInit() {
		this.courseService.startCourses = 0;
		this.courseService.filterString = '';
		this.onAddMore();
		this.loadRunnerServiceSubscriber = this.loadRunnerService.isShow.subscribe((data) => {
			this.isLoadRunnerShow = data;
			this.cdRef.markForCheck();
		});
		// this.courseServiceFilterSubscriber = this.courseService.getFilterCourses.subscribe((data) => {
		// 	// console.log(data);
		// 	//this.courseList = data;
		// 	this.cdRef.markForCheck();
		// });
		this.courseServiceGetListSubscriber = this.store.select((state: State) => state.course)
		.map((coursesState) => coursesState.courses)
		.subscribe((courses) => {
			this.courseList = courses;
			this.cdRef.markForCheck();
			this.loadRunnerService.Hide();
		});
	}

	public onAddMore() {
		this.courseService.startCourses += this.courseService.countCourses;
		this.store.dispatch(new courseAction.Courses());
		// this.courseServiceGetListSubscriber = this.courseService.getList()
		// .subscribe((data: Course[]) => {
		// 	this.courseService.courseList = data;
		// 	this.courseList = this.courseList.concat(data);
		// 	this.cdRef.markForCheck();
		// });
	}
	public onDeleteCourse(course: Course) {
		this.deleteCourse = course;
		this.isShownDeleteConfirmation = true;
	}

	public onDeleteConfirmationCourse(isConfirmDelete: boolean) {
		if (isConfirmDelete) {
			this.loadRunnerService.Show();
			this.store.dispatch(new courseAction.DeleteCourse(this.deleteCourse.id));
			// this.courseService.removeItem(this.deleteCourse.id)
			// 				.subscribe((data) => {if (data) {
			// 					this.loadRunnerService.Hide();
			// 					this.courseService.filterCourses('');
			// 					}
			// 				});
		}
		this.isShownDeleteConfirmation = false;
	}

	public ngOnDestroy() {
		// unsubscribe here
		this.loadRunnerServiceSubscriber.unsubscribe();
		// this.courseServiceFilterSubscriber.unsubscribe();
		this.courseServiceGetListSubscriber.unsubscribe();
		// console.log('ngOnDestroy');
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
		// console.log('ngAfterViewInit courses');
		this.breadCrumbService.setBreadCrumbLeaf(this.breadCrumbItem);
	}

	// public ngAfterViewChecked() {
	// 	console.log('ngAfterViewChecked');
	// }
}
