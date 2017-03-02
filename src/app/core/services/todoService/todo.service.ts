import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { TodoItem } from '../../entities';

@Injectable()
export class TodoService {

	private todoListUrl: string = 'http://private-4b671-exampleservice.apiary-mock.com/api/todos';

	constructor(private http: Http) {
	}

	public getTodoItems (): Observable<TodoItem[]> {
		return this.http.get(this.todoListUrl)
			.map((response: Response) => response.json())
			.map((todoItems: TodoItem[]) => {
				// change return value structure here if you want
				return todoItems;
			});
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
