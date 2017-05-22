/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation, NgZone
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	template: require('./app.template.html')
})
export class AppComponent implements OnInit {

	private timeDif: number;

	constructor(private ngZone: NgZone) {
	}

	public ngOnInit() {
		this.ngZone.onStable.subscribe(() => {
			// console.log(`${((Date.now() - this.timeDif) % 3600) / 60 / 60}sek`);
		});
		this.ngZone.onUnstable.subscribe(() => {
			// this.timeDif = Date.now();
		});
	}

}
