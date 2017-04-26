import { Authors } from './authors.model';

export class Course {
	public id: number;
	public name: string;
	public description: string;
	public duration: number;
	public date: number;
	public topRated: boolean;
	public authors: Authors[];

	constructor(obj?) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.duration = obj.duration;
		this.date = Date.parse(obj.date);
		this.topRated = obj.topRated;
		console.dir(obj.authors);
		this.authors = obj.authors; // .map((authors) => authors.map((author) => new Authors(author)));
	}
}
