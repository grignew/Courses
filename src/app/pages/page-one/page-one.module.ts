// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './page-one.routes';

// custom components
import { PageOneComponent } from './page-one.component';

@NgModule({
	declarations: [
		PageOneComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class PageOneModule {
	constructor() {
	}
}
