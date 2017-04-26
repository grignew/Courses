import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import moment from 'moment';

@Directive({
	selector: '[courseBorder]'
})

export class CourseBorderDirective {
	@Input() set courseBorderSet(courseDate: Date) {
		console.log(`${courseDate} > ${moment().toDate()}`);
		if (courseDate >= moment().subtract(14, 'days').toDate()) {
			console.log(`${courseDate} >= ${moment().subtract(14, 'days').toDate()}`);
			this.renderer.setElementClass(this.el.nativeElement, 'current-course', true);
		}
		if (courseDate > moment().toDate()) {
			console.log(`${courseDate} > ${moment().toDate()}`);
			this.renderer.setElementClass(this.el.nativeElement, 'future-course', true);
		}
	}

	constructor(private el: ElementRef, private renderer: Renderer) {
	}
}
