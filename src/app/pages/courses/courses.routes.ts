import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent }    from './courses.component';
import { LoginComponent }    from './login/login.component';

// Route Configuration
const coursesRoutes: Routes = [
	{ path: 'courses', component: CoursesComponent },
	{ path: 'login', component: LoginComponent},
];

export const routes = RouterModule.forChild(coursesRoutes);
