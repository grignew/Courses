import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'page-two',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./page-two.styles.scss')],
	template: require('./page-two.template.html')
})
export class PageTwoComponent implements OnInit, OnDestroy {
	constructor() {
		console.log('Page two constructor');
	}

	public ngOnInit() {
		console.log('Page two init');
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
