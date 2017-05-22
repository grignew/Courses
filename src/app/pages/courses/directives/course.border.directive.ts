import { Directive, ElementRef, Input, Renderer, Inject } from '@angular/core';
// import moment from 'moment';

@Directive({
	selector: '[courseBorder]'
})

export class CourseBorderDirective {
	@Input() set courseBorderSet(courseDate: Date) {
		// console.log(`${courseDate} > ${this.moment().toDate()}`);
		// console.log(`${courseDate} >= ${this.moment().subtract(14, 'days').toDate()}`);
		if (courseDate >= this.moment().subtract(14, 'days').toDate()) {
			// console.log(`${courseDate} >= ${this.moment().subtract(14, 'days').toDate()}`);
			this.renderer.setElementClass(this.el.nativeElement, 'current-course', true);
		}
		if (courseDate > this.moment().toDate()) {
			// console.log(`${courseDate} > ${this.moment().toDate()}`);
			this.renderer.setElementClass(this.el.nativeElement, 'future-course', true);
		}
	}

	constructor(
		private el: ElementRef,
		private renderer: Renderer,
		@Inject('moment') private moment) {
	}
}
