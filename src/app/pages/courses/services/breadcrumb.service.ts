import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BreadCrumbService {
	private menuItem = new ReplaySubject(1);
	private breadCrumbList: string[];

	constructor() {
		this.breadCrumbList = [];
	}

	public setBreadCrumbLeaf(leaf: string) {
		this.breadCrumbList.push(leaf);
		console.log(this.breadCrumbList);
		this.menuItem.next(this.breadCrumbList);
	}

	public removeBreadCrumb(leaf: string) {
		this.breadCrumbList.splice(this.breadCrumbList.indexOf(leaf), 1);
		this.menuItem.next(this.breadCrumbList);
	}

	get getMenuItem(): Observable<string[]> {
		return this.menuItem;
	}
}
