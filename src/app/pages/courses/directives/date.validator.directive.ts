import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, AbstractControl } from '@angular/forms';

@Directive({
	selector: '[validateDate]',
	providers: [{
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => DateValidatorDirective),
	multi: true
	}]
})

export class DateValidatorDirective implements Validator {

	public validate(c: FormControl): {[key: string]: boolean} {
		let DATE_REGEXP = new RegExp('\\d{2,2}\/\\d{2,2}\/\\d{4,4}');
		console.log('DateValidatorDirective=', c.value);
		return DATE_REGEXP.test(c.value) ? null : { invalidDate: true };
	}
}
