import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';
import { CoursesComponent } from './pages/courses';

export const ROUTES: Routes = [
	{path: '', redirectTo: 'courses', pathMatch: 'full'},
	{path: '**', component: NoContentComponent},
];
