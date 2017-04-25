import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CoursesComponent }    from './courses.component';
import { LoginComponent }    from './login/login.component';
import { AddCourseComponent }    from './course/course-maintain/course-add.component';

// Route Configuration
const coursesRoutes: Routes = [
	{ path: 'courses', component: CoursesComponent },
	{ path: 'login', component: LoginComponent},
	{ path: 'addcourse/:id', component: AddCourseComponent},
];

export const routes = RouterModule.forRoot(coursesRoutes, {useHash: true, preloadingStrategy: PreloadAllModules});
