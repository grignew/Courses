import { Routes, RouterModule } from '@angular/router';
import { PageOneComponent }    from './page-one.component';

// Route Configuration
const pageOneRoutes: Routes = [
	{ path: 'pageone', component: PageOneComponent },
];

export const routes = RouterModule.forChild(pageOneRoutes);
