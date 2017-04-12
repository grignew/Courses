import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadRunnerService } from '../services/loadrunner.service';
import { Subscription, Observer } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { BreadCrumbService } from '../services/breadcrumb.service';

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
	public isLoadRunnerShow: boolean = false;
	private loadRunnerServiceSubscriber: Subscription;

	constructor(
		private authService: AuthService,
		private loadRunnerService: LoadRunnerService,
		private cdRef: ChangeDetectorRef,
		private router: Router,
		private breadCrumbService: BreadCrumbService) {
	}

	public onLogin() {
		this.loadRunnerService.Show();
		this.authService.Login(this.userName).subscribe((data) => {
			if (data) {
				this.loadRunnerService.Hide();
				this.router.navigate(['/courses']);
			}
		});
	}

	public ngOnInit() {
		this.loadRunnerServiceSubscriber = this.loadRunnerService.isShow.subscribe((data) => {
			this.isLoadRunnerShow = data;
			this.cdRef.markForCheck();
		} );
	}
	public ngOnDestroy() {
		this.loadRunnerServiceSubscriber.unsubscribe();
	}
}
