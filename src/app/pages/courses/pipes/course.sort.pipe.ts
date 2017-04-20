import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myCoursesSortBy'
})
export class CourseSortPipe implements PipeTransform {
	public transform(allCourses: any[]) {
		console.log(`pip sort`, allCourses);
		return allCourses.sort((course1, course2) => {
			return course1.date === course2.date ? 0 : course1.date >= course2.date ? 1 : -1;
		});
	}
}
