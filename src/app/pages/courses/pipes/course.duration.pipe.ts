import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myCourseDuration'
})
export class CourseDurationPipe implements PipeTransform {
	public transform(duration: number) {
		if (Math.trunc(duration / 3600) === 0) {
			return `${(duration % 3600) / 60}min`;
		}else {
			return `${Math.trunc(duration / 3600)}h ${(duration % 3600) / 60}min`;
		}
	}
}
