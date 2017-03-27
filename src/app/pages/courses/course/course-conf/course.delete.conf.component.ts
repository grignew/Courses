import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'delete-conf',
	styles: [require('./course.delete.conf.style.scss')],
	template: `
	       <div class="confdelete">
			<div class="confmodal">
				<div class="confmodal-header">
					Delete confirmation
				</div>
				<div class="confmodal-content">
					<p>Do you really want to delete this course?</p>
				</div>
				<div class="confmodal-footer">
				<button (click)="confirm()" class="pull-right button btn btn-default">Yes</button>
				<button (click)="reject()" class="pull-right button btn btn-default">No</button>
				</div>
			</div>
			</div>
			`,
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeleteConfirmDialogComponent {
	@Output() public onDeleteConfirmationCourseEvent = new EventEmitter<boolean>();

	constructor() {
	}
	public confirm() {
		this.onDeleteConfirmationCourse(true);
	}
	public reject() {
		this.onDeleteConfirmationCourse(false);
	}

	public onDeleteConfirmationCourse(isConfirmed: boolean) {
		this.onDeleteConfirmationCourseEvent.emit(isConfirmed);
	}
}
