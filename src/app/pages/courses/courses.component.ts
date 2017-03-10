import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Course } from './models';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {
	public courseList: Course[];

	constructor() {
		console.log('Courses constructor');
	}

	public ngOnInit() {
		console.log('Courses init');
		this.courseList = [
							{
								id: 1,
								name: 'Video course 1',
								description: 'test course',
								duration: 3780,
								date: 1488796606004
							},
							{
								id: 2,
								name: 'Video course 2',
								description: 'test course 1',
								duration: 480,
								date: 1487796606004
							},
							{
								id: 3,
								name: 'Video course 3',
								description: 'test course 2',
								duration: 480,
								date: 1477796606004
							}
						];
}

	public ngOnDestroy() {
		// unsubscribe here
	}

	public onDeleteCourse(course) {
		console.log(`Delete Course ${course.name}!`);
	}
}
