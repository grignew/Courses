// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// routes
import { routes } from './courses.routes';

// custom components
import { CoursesComponent } from './courses.component';
import { LogoComponent } from './logo/logo.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseItemComponent } from './course/course-item/course-item.component';
import { FooterComponent } from './footer/footer.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { LoginComponent }    from './login/login.component';
import { HeaderComponent }    from './header/header.component';
import { DeleteConfirmDialogComponent } from './course/course-conf/course.delete.conf.component';
import { LoadRunnerComponent } from './load-runner/load-runner.component';
import { AddCourseComponent } from './course/course-maintain/course-add.component';
import { CourseDateComponent } from './course/custom-components/date.component';
import { CourseDurationComponent } from './course/custom-components/duration.component';

// services
import { CourseService } from './services/course.maintain.service';
import { AuthService } from './services/auth.service';
import { LoadRunnerService } from './services/loadrunner.service';
import { BreadCrumbService } from './services/breadcrumb.service';
import { AuthorizedHttp } from './services/authorizedhttp.service';

// directives
import { CourseBorderDirective } from './directives/course.border.directive';
import { DateValidatorDirective } from './directives/date.validator.directive';
import { DurationValidatorDirective } from './directives/duration.validator.directive';
import { CourseDurationPipe } from './pipes/course.duration.pipe';
import { CourseSortPipe } from './pipes/course.sort.pipe';
import { CourseFilterPipe } from './pipes/course.filter.pipe';

@NgModule({
	declarations: [
		CoursesComponent,
		LogoComponent,
		CourseSearchComponent,
		CourseItemComponent,
		FooterComponent,
		BreadCrumbComponent,
		LoginComponent,
		HeaderComponent,
		DeleteConfirmDialogComponent,
		LoadRunnerComponent,
		CourseBorderDirective,
		CourseDurationPipe,
		CourseSortPipe,
		CourseFilterPipe,
		AddCourseComponent,
		CourseDateComponent,
		DateValidatorDirective,
		CourseDurationComponent,
		DurationValidatorDirective
	],
	imports: [
		// routes,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		HttpModule
	],
	providers: [CourseService, AuthService, LoadRunnerService, BreadCrumbService, AuthorizedHttp]
})
export class CoursesModule {
	constructor() {
	}
}
