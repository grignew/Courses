import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import moment from 'moment';

const CUSTOM_COURSE_DURATION_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	// tslint:disable-next-line:no-forward-ref
	useExisting: forwardRef(() => CourseDurationComponent),
	multi: true
};

@Component({
	selector: 'course-duration',
	// tslint:disable-next-line:max-line-length
	template: '<input type="number" placeholder="MMM" class="form-control" [value]="duration" (input)="setValue($event)">',
	providers: [CUSTOM_COURSE_DURATION_ACCESSOR]
})
export class CourseDurationComponent implements ControlValueAccessor {
	public duration: number;

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
		this.duration = value;
	}

	private onChange = (_) => {};
	private onTouched = () => {};
}
