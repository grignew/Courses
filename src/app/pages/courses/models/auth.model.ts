import { UserName } from './user.name.model';

export class AuthUser {
	public id: number;
	public fakeToken: string;
	public name: UserName;
	public login: string;
	public password: string;

	constructor(obj?) {
		this.id = obj.id;
		this.fakeToken = obj.fakeToken;
		this.name = new UserName(obj.name);
		this.login = obj.login;
		this.password = obj.password;
	}
}
