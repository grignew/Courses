import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }    from './home.component';

// Route Configuration
const homeRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
];

export const routes = RouterModule.forChild(homeRoutes);
