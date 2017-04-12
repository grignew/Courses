import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BreadCrumbService } from '../../services/breadcrumb.service';

@Component ({
	selector: 'course-add',
	templateUrl: 'course-add.component.html',
	styles: [require('./course-add.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
})
export class AddCourseComponent implements AfterViewInit {
	public courseDuration: number;

	constructor(private breadCrumbService: BreadCrumbService) {
	}

	public onSave() {
		console.log('save course');
	}

	public onCancel() {
		console.log('cancel course');
	}

	public onDurationKeyDown(event: KeyboardEvent) {
		console.log(event.code, event);
		if (event.key === '.' || event.key === ',') {
			event.preventDefault();
		}
	}

	public ngAfterViewInit() {
		console.log('ngAfterViewInit add course');
		this.breadCrumbService.setBreadCrumbLeaf('Add Course');
	}
}
