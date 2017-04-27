import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CoursesComponent }    from './courses.component';
import { LoginComponent }    from './login/login.component';
import { AddCourseComponent }    from './course/course-maintain/course-add.component';
import { NoContentComponent } from './../no-content';
import { CanActivateGuard } from './activate.guard.ts';

// Route Configuration
const coursesRoutes: Routes = [
	{ path: '', redirectTo: 'courses' , pathMatch: 'full'},
	{ path: 'courses', component: CoursesComponent, canActivate: [CanActivateGuard] },
	{ path: 'login', component: LoginComponent},
	{ path: 'courses/:id', component: AddCourseComponent, canActivate: [CanActivateGuard]},
	{ path: 'courses/new', component: AddCourseComponent, canActivate: [CanActivateGuard]},
	{ path: '**', component: NoContentComponent },
];

export const routes = RouterModule.forRoot(coursesRoutes,
	{useHash: true, preloadingStrategy: PreloadAllModules});
