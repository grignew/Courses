import { Directive, forwardRef, Inject } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, AbstractControl } from '@angular/forms';
//  import moment from 'moment';

@Directive({
	selector: '[validateDate]',
	providers: [{
		provide: NG_VALIDATORS,
		// tslint:disable-next-line:no-forward-ref
		useExisting: forwardRef(() => DateValidatorDirective),
		multi: true
		}]
})

export class DateValidatorDirective implements Validator {

	public constructor(@Inject('moment') private moment) {

	}
	public validate(c: FormControl): {[key: string]: boolean} {
		return this.moment(c.value).isValid() ?
			null :
			{ invalidDate: true };
	}
}
