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
	template: '<input type="text" placeholder="DD/MM/YYYY" class="form-control" [value]="date" (change)="setValue($event)">',
	providers: [CUSTOM_COURSE_DATE_ACCESSOR]
})
export class CourseDateComponent implements ControlValueAccessor {
	@Input() public date: string;

	constructor() {
	}
	public setValue(item) {
		this.onChange(item.target.value);
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
	}

	private onChange = (_) => {};
	private onTouched = () => {};
}
