import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { LoadRunnerService } from '../services/loadrunner.service';
import { Subscription, Observer } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { BreadCrumbService } from '../services/breadcrumb.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from './../reducers';
import * as auth from './../reducers/auth.reducer';
import * as authActions from './../actions/auth.action';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styles: [require('./login.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements  OnInit, OnDestroy {
	public userName: string;
	public userPass: string;
	public isLoadRunnerShow: boolean = false;
	public errorMessage: string;
	private loadRunnerServiceSubscriber: Subscription;
	private stateSubscriber: Subscription;

	constructor(
		// private authService: AuthService,
		private loadRunnerService: LoadRunnerService,
		private cdRef: ChangeDetectorRef,
		private router: Router,
		private breadCrumbService: BreadCrumbService,
		private store: Store<State>) {
	}

	public onLogin() {
		this.loadRunnerService.Show();
		this.store.dispatch(new authActions.Login({login: this.userName, password: this.userPass}));
	}

	public ngOnInit() {
		this.loadRunnerServiceSubscriber = this.loadRunnerService.isShow.subscribe((data) => {
			this.isLoadRunnerShow = data;
			this.cdRef.markForCheck();
		} );
		this.stateSubscriber = this.store.select((state: State) => state.auth)
		.subscribe((stateAuth) => {
			this.loadRunnerService.Hide();
			if (stateAuth.authUser) {
				this.router.navigate(['/courses']);
			}
			if (stateAuth.error) {
				this.errorMessage = stateAuth.error;
				this.cdRef.markForCheck();
			}
		});
	}
	public ngOnDestroy() {
		this.loadRunnerServiceSubscriber.unsubscribe();
		this.stateSubscriber.unsubscribe();
	}
}
