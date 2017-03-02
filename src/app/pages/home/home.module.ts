// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './home.routes';

// custom components
import { HomeComponent } from './home.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
	declarations: [
		HomeComponent,
		TodoItemComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class HomeModule {
	constructor() {
	}
}
