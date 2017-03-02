import { Routes, RouterModule } from '@angular/router';
import { PageTwoComponent }    from './page-two.component';

// Route Configuration
const pageTwoRoutes: Routes = [
	{ path: 'pagetwo', component: PageTwoComponent },
];

export const routes = RouterModule.forChild(pageTwoRoutes);
