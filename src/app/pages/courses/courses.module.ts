// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './courses.routes';

// custom components
import { CoursesComponent } from './courses.component';
import { LogoComponent } from './logo/logo.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseItemComponent } from './course/course-item/course-item.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';

@NgModule({
	declarations: [
		CoursesComponent,
		LogoComponent,
		CourseSearchComponent,
		CourseItemComponent,
		CopyrightComponent,
		BreadCrumbComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class CoursesModule {
	constructor() {
	}
}
