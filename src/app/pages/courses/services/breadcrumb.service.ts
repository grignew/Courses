import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';
import { BreadCrumb } from '../models/breadcrumb.model';

@Injectable()
export class BreadCrumbService {
	private menuItem = new ReplaySubject(1);
	private breadCrumbList: BreadCrumb[];

	constructor() {
		this.breadCrumbList = [];
	}

	public setBreadCrumbLeaf(leaf: BreadCrumb) {
		if (this.breadCrumbList.filter((item) => item.name === leaf.name).length  === 0) {
			this.breadCrumbList.push(leaf);
			console.log(this.breadCrumbList);
			this.menuItem.next(this.breadCrumbList);
		}
	}

	public removeBreadCrumb(leaf: BreadCrumb) {
		this.breadCrumbList.splice(this.breadCrumbList.indexOf(leaf), 1);
		this.menuItem.next(this.breadCrumbList);
	}

	public removeAfterCurrent(leaf: BreadCrumb) {
		this.breadCrumbList.splice(this.breadCrumbList.indexOf(leaf) + 1);
		this.menuItem.next(this.breadCrumbList);
	}

	public removeAll() {
		this.breadCrumbList = [];
		this.menuItem.next(this.breadCrumbList);
	}

	get getMenuItem(): Observable<BreadCrumb[]> {
		return this.menuItem;
	}
}
