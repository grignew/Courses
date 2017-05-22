import { Pipe, PipeTransform, Inject } from '@angular/core';
// import moment from 'moment';

@Pipe({
	name: 'myCoursesFilterBy'
})
export class CourseFilterPipe implements PipeTransform {
	public constructor(@Inject('moment') private moment) {}

	public transform(allCourses: any[], courseName: string) {
		return allCourses.filter((course) =>
			courseName ? course.name.toLowerCase().includes(courseName.toLowerCase()) : true)
			.filter((course) => course.date >=  this.moment().subtract(14, 'days').unix() * 1000);
	}

}
