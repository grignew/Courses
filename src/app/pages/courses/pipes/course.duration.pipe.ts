import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myCourseDuration'
})
export class CourseDurationPipe implements PipeTransform {
	public transform(duration: number) {
		if (isNaN(duration)) {
			return '';
		}
		if (!duration) {
			return '';
		}
		if (duration < 60) {
			return `${duration}min`;
		}else {
			return `${Math.trunc(duration / 60)}h ${Math.round(duration % 60)}min`;
		}
	}
}
