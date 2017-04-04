import { Directive, ElementRef, Input } from '@angular/core';
import moment from 'moment';

@Directive({
	selector: '[courseBorder]'
})

export class CourseBorderDirective {
	@Input() set courseBorderSet(courseDate: number) {
		console.log(`${courseDate} > ${Date.now()}`);
		if (courseDate >= moment().subtract(14, 'days').unix() * 1000) {
			console.log(`${courseDate} >= ${moment().subtract(14, 'days').unix() * 1000}`);
			this.el.nativeElement.style.borderColor = 'green';
		}
		if (courseDate > Date.now()) {
			console.log(`${courseDate} > ${Date.now()}`);
			this.el.nativeElement.style.borderColor = 'blue';
		}
	}

	constructor(private el: ElementRef) {
	}
}
