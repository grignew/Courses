import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'courselogo',
	templateUrl: 'logo.component.html',
	styles: [require('./logo.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
	public userInfo: string;
	private userInfoSubsriber: Subscription;

	constructor(private authService: AuthService) {
	}

	public ngOnInit() {
		this.userInfoSubsriber = this.authService.GetUserInfo().subscribe((data) => {
			this.userInfo = data;
		});
	}
	public ngOnDestroy() {
		this.userInfoSubsriber.unsubscribe();
	}
	public onLogoff() {
		this.authService.Logout();
	}
}
