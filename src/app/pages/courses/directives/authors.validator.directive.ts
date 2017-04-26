import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, AbstractControl } from '@angular/forms';
import { Authors } from './../models';

@Directive({
	selector: '[validateAuthors]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => AuthorsValidatorDirective),
		multi: true
		}]
})

export class AuthorsValidatorDirective implements Validator {

	public validate(c: FormControl): {[key: string]: boolean} {
		return c.value && (c.value as Authors[]).length > 0 ? null : { invalidAuthors: true };
	}
}
