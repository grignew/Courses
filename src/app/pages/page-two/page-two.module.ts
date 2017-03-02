// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './page-two.routes';

// custom components
import { PageTwoComponent } from './page-two.component';

@NgModule({
	declarations: [
		PageTwoComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class PageTwoModule {
	constructor() {
	}
}
