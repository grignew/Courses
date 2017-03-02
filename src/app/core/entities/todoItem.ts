export  class TodoItem {
	public title: string;
	public subTitle: string;
	public startDate: Date;
	public endDate: Date;

	constructor(title: string, subTitle: string, startDate: Date, endDate: Date) {
		this.title = title;
		this.subTitle = subTitle;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
