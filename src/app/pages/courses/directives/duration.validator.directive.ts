import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, AbstractControl } from '@angular/forms';

@Directive({
	selector: '[validateDuration]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => DurationValidatorDirective),
		multi: true
		}]
})

export class DurationValidatorDirective implements Validator {

	public validate(c: FormControl): {[key: string]: boolean} {
		let DATE_REGEXP = new RegExp('\\d+');
		return DATE_REGEXP.test(c.value) ? null : { invalidDuration: true };
	}
}
