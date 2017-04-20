export class Authors {
	public id: number;
	public firstName: string;
	public lastName: string;

	constructor(obj?) {
		this.id = obj.id;
		this.firstName = obj.firstName;
		this.lastName = obj.lastName;
	}
}
