import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import moment from 'moment';

const CUSTOM_COURSE_DATE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CourseDateComponent),
	multi: true
};

@Component({
	selector: 'course-date',
	template: '<input type="text" placeholder="DD/MM/YYYY" class="form-control" [value]="humanDate" (change)="setValue($event)">',
	providers: [CUSTOM_COURSE_DATE_ACCESSOR]
})
export class CourseDateComponent implements ControlValueAccessor {
	public date: Date;
	public humanDate: string;
	constructor() {
	}
	public setValue(item) {
		let DATE_REGEXP = new RegExp('\\d{2,2}\/\\d{2,2}\/\\d{4,4}');
		if (DATE_REGEXP.test(item.target.value)) {
				this.onChange(moment(item.target.value, 'DD/MM/YYYY').toDate());
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
		this.date = value; //  ? moment(value).format('DD/MM/YYYY') : '';
		this.humanDate = moment(this.date).format('DD/MM/YYYY');
	}

	private onChange = (_) => {};
	private onTouched = () => {};
}
