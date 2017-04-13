import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import {  OnInit } from '@angular/core';
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
	@Input() public breadCrumb: BreadCrumb;
	public isFirstItem: boolean = false;

	constructor(private breadCrumbService: BreadCrumbService) {
	}

	public ngOnInit() {
		this.breadCrumbService.getMenuItem.subscribe((menuItems) => {
			this.isFirstItem = menuItems.indexOf(this.breadCrumb) === 0;
		});
	}

	public onClick() {
		console.log('onclick breadcrumb');
		this.breadCrumbService.removeAfterCurrent(this.breadCrumb);
	}
}
