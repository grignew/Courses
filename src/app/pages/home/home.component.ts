import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoService } from '../../core/services';
import { TodoItem } from '../../core/entities';

@Component({
	selector: 'home',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./home.styles.scss')],
	template: require('./home.template.html')
})
export class HomeComponent implements OnInit, OnDestroy {
	private todoServiceSubscription: Subscription;
	private todoList: TodoItem[];
	private isLoading: boolean = false;

	constructor(private todoService: TodoService) {
		console.log('Home page constructor');

		this.todoList = [];
	}

	public ngOnInit() {
		console.log('Home page init');

		this.isLoading = true;
		this.todoServiceSubscription = this.todoService.getTodoItems().subscribe((res: TodoItem[]) => {
			this.todoList = res;
			this.isLoading = false;
		});
	}

	public ngOnDestroy() {
		this.todoServiceSubscription.unsubscribe();
	}
}
