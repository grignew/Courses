import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Course } from './models';
import { CourseService } from './services/course.maintain.service';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	public isShownDeleteConfirmation: boolean;
	public courseList: Course[];
	private deleteCourse: Course;

	constructor(
				private courseService: CourseService,
				private authService: AuthService) {
		console.log('Courses constructor');
	}

	public ngOnInit() {
		console.log('Courses init');
		this.courseList = this.courseService.getList();
	}

	public onDeleteCourse(course: Course) {
		console.log(`Delete Course ${course.name}!`);
		this.deleteCourse = course;
		this.isShownDeleteConfirmation = true;
	}

	public onDeleteConfirmationCourse(isConfirmDelete: boolean) {
		if (isConfirmDelete) {
			this.courseService.removeItem(this.deleteCourse.id);
		}
		this.isShownDeleteConfirmation = false;
	}

	public ngOnDestroy() {
		// unsubscribe here
		console.log('ngOnDestroy');
	}

	public ngOnChanges() {
		console.log('ngOnChanges');
	}

	public ngDoCheck() {
		console.log('ngDoCheck');
	}

	public ngAfterContentInit() {
		console.log('ngAfterContentInit');
	}

	public ngAfterContentChecked() {
		console.log('ngAfterContentChecked');
	}

	public ngAfterViewInit() {
		console.log('ngAfterViewInit');
	}

	public ngAfterViewChecked() {
		console.log('ngAfterViewChecked');
	}
}
