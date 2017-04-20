export class UserName {
	public first: string = null;
	public last: string = null;

	constructor(obj?) {
		if (obj) {
			this.first = obj.first;
			this.last = obj.last;
		}
	}
}
