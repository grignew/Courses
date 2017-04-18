import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BreadCrumbService } from '../services/breadcrumb.service';
import { BreadCrumb } from '../models';

@Component({
	selector: 'courselogo',
	templateUrl: 'logo.component.html',
	styles: [require('./logo.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit, OnDestroy {
	public userInfo: string;
	public breadCrumbList: BreadCrumb[];
	public isAuthenticated: boolean;
	private userInfoSubsriber: Subscription;

	constructor(
		private authService: AuthService,
		private breadCrumbService: BreadCrumbService,
		private cdRef: ChangeDetectorRef
		) {
			this.isAuthenticated = this.authService.IsAuthenticated();
	}

	public ngOnInit() {
		this.userInfoSubsriber = this.authService.GetUserInfo().subscribe((data) => {
			this.userInfo = data;
		});
		/*this.breadCrumbService.getMenuItem.subscribe((menuItem) => {
			this.breadCrumbList = menuItem;
			this.cdRef.markForCheck();
		});*/
	}
	public ngOnDestroy() {
		this.userInfoSubsriber.unsubscribe();
	}
	public onLogoff() {
		this.breadCrumbService.removeAll();
		this.authService.Logout();
	}
}
