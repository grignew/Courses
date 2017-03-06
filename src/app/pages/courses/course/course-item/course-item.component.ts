import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'course-item',
	templateUrl: 'course-item.component.html',
	styles: [require('./course-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseItemComponent {
	@Input() public course: any;

	constructor() {
	}

	public getTime(duration: number): string {
		return `${Math.trunc(duration / 3600)}h ${(duration % 3600) / 60}min`;
	}
}
