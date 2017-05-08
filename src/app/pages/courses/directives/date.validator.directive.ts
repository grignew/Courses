import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, AbstractControl } from '@angular/forms';
import moment from 'moment';

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
		return moment(c.value).isValid() ?
			null :
			{ invalidDate: true };
	}
}
