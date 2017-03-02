import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'page-one',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./page-one.styles.scss')],
	template: require('./page-one.template.html')
})
export class PageOneComponent implements OnInit, OnDestroy {
	constructor() {
		console.log('Page one constructor');
	}

	public ngOnInit() {
		console.log('Page one init');
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
