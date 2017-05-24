import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AuthorsService } from './../../services/authors.service';
import { Authors } from './../../models';
import { Subscription, Observer } from 'rxjs/Rx';

const CUSTOM_COURSE_AUTHORS_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	// tslint:disable-next-line:no-forward-ref
	useExisting: forwardRef(() => CourseAuthorsComponent),
	multi: true
};

@Component({
	selector: 'authors-sel',
	template: `<div class="form-control authors">
				<div *ngFor="let author of authors">
					<input type="checkbox"
						[checked]="checkAuthorsList(author.id)"
						(change)="changeAuthor(author,$event)"
					> {{author.firstName}} {{author.lastName}}
				</div>
				</div>`,
	styles: [`.authors {
		max-height: 150px;
		overflow-y: auto;
		}
	`],
	providers: [CUSTOM_COURSE_AUTHORS_ACCESSOR]
})
export class CourseAuthorsComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public courseAuthors: Authors[];
	public authors: Authors[];
	private subscrAuthorsService: Subscription;

	constructor(private authorsServices: AuthorsService) {
	}

	public checkAuthorsList(id: number): boolean {
		return this.courseAuthors ?
			this.courseAuthors.findIndex((author) => author.id === id) >= 0 :
			false;
	}

	public changeAuthor(author: Authors, event) {
		if (event.target.checked) {
			this.courseAuthors.push(author);
		}else {
			this.courseAuthors.splice(
				this.courseAuthors.findIndex((authorin) => authorin.id === author.id), 1);
		}
		// console.dir(this.courseAuthors);
		this.onChange(this.courseAuthors);
		this.onTouched();
	}

	public registerOnChange(fn: any) {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	public writeValue(value: any) {
		if (value) {
			this.courseAuthors = value;
		}else {
			this.courseAuthors = [];
		}
	}

	public ngOnInit() {
		this.subscrAuthorsService = this.authorsServices.getList().subscribe(
			(authors) => {
				this.authors = authors;
				// console.dir(this.authors);
			}
		);
	}

	public ngOnDestroy() {
		this.subscrAuthorsService.unsubscribe();
	}

	private onChange = (_) => {};
	private onTouched = () => {};

}
