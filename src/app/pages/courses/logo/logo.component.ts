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
import { AuthUser } from './../models/auth.model';
import { Store } from '@ngrx/store';
import { State } from './../reducers';
import * as auth from './../actions/auth.action';

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
		// private authService: AuthService,
		private store: Store<State>,
		private breadCrumbService: BreadCrumbService,
		private cdRef: ChangeDetectorRef
		) {
			// this.store.select((state) => state.auth).first()
			// .map((stateAuth) => stateAuth.authUser)
			// .subscribe((authUser) => {
			// 	this.isAuthenticated = !!authUser;
			// });
			// this.isAuthenticated = this.authService.IsAuthenticated();
	}

	public ngOnInit() {
		this.userInfoSubsriber = this.store.select((state) => state.auth).first()
		.map((stateAuthUser) => stateAuthUser.authUser)
		.subscribe((authUser) => {
			if (!!authUser) {
				this.userInfo = `${authUser.name.last} ${authUser.name.first}`;
			}
			this.isAuthenticated = !!authUser;
		});
		// this.userInfoSubsriber = this.authService.GetUserInfo().subscribe((user: AuthUser) => {
		// 	this.userInfo = `${user.name.last} ${user.name.first}`;
		// 	this.cdRef.markForCheck();
		// },
		// (err) => this.userInfo = 'Error');
	}
	public ngOnDestroy() {
		this.userInfoSubsriber.unsubscribe();
	}
	public onLogoff() {
		this.breadCrumbService.removeAll();
		this.store.dispatch(new auth.Logout());
		// this.authService.Logout();
	}
}
