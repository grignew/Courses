import { Component, Input, forwardRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import moment from 'moment';

const CUSTOM_COURSE_DATE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	// tslint:disable-next-line:no-forward-ref
	useExisting: forwardRef(() => CourseDateComponent),
	multi: true
};

@Component({
	selector: 'course-date',
	// tslint:disable-next-line:max-line-length
	template: '<input type="text" placeholder="DD/MM/YYYY" class="form-control" [value]="humanDate" (change)="setValue($event)">',
	providers: [CUSTOM_COURSE_DATE_ACCESSOR]
})
export class CourseDateComponent implements ControlValueAccessor {
	public date: Date;
	public humanDate: string = '';
	constructor(@Inject('moment') private moment) {
	}
	public setValue(item) {
		let DATE_REGEXP = new RegExp('\\d{2,2}\/\\d{2,2}\/\\d{4,4}');
		if (DATE_REGEXP.test(item.target.value)) {
				this.onChange(this.moment(item.target.value, 'DD/MM/YYYY').toDate());
		}else {
			this.onChange(null);
		}
		this.onTouched();
	}
	public registerOnChange(fn: any) {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	public writeValue(value: any) {
		this.date = value;
		if (this.date) {
			this.humanDate = this.moment(this.date).format('DD/MM/YYYY');
		}
	}

	private onChange = (_) => {};
	private onTouched = () => {};
}
