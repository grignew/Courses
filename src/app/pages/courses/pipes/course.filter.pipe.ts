import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myCoursesFilterBy'
})
export class CourseFilterPipe implements PipeTransform {
	public transform(allCourses: any[], courseName: string) {
		return allCourses.filter((course) =>
			course.name.toLowerCase().includes(courseName.toLowerCase()));
	}
}
