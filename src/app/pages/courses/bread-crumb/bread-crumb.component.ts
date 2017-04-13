import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import {  OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadCrumbService } from '../services/breadcrumb.service';
import { BreadCrumb } from '../models';

@Component({
	selector: 'bread-crumb',
	templateUrl: 'bread-crumb.component.html',
	styles: [require('./bread-crumb.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbComponent implements OnInit {
	public isFirstItem: boolean = false;
	public breadCrumbList: BreadCrumb[];

	constructor(
		private breadCrumbService: BreadCrumbService,
		private cdRef: ChangeDetectorRef) {
	}

	public ngOnInit() {
		this.breadCrumbService.getMenuItem.subscribe((menuItem) => {
			this.breadCrumbList = menuItem;
			this.cdRef.markForCheck();
		});
	}

	public onClick(event, breadCrumb: BreadCrumb) {
		this.breadCrumbService.removeAfterCurrent(breadCrumb);
	}
}
