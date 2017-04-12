import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import moment from 'moment';

@Directive({
	selector: '[courseBorder]'
})

export class CourseBorderDirective {
	@Input() set courseBorderSet(courseDate: number) {
		console.log(`${courseDate} > ${Date.now()}`);
		if (courseDate >= moment().subtract(14, 'days').unix() * 1000) {
			console.log(`${courseDate} >= ${moment().subtract(14, 'days').unix() * 1000}`);
			this.renderer.setElementClass(this.el.nativeElement, 'current-course', true);
		}
		if (courseDate > Date.now()) {
			console.log(`${courseDate} > ${Date.now()}`);
			this.renderer.setElementClass(this.el.nativeElement, 'future-course', true);
		}
	}

	constructor(private el: ElementRef, private renderer: Renderer) {
	}
}
