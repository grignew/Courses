import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CourseBorderDirective } from './course.border.directive';
import * as moment from 'moment';
import { By } from '@angular/platform-browser';


@Component({
	selector: 'test-directive-courde-border',
	template: '<div courseBorder [courseBorderSet]="courseDate"></div>'
})
export class TestCourseItemComponent {
	public courseDate: Date;

	constructor() {
	}
}


describe('CourseBorderDirective', () => {
	let fixture: ComponentFixture<TestCourseItemComponent>;
	let component: TestCourseItemComponent;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [TestCourseItemComponent, CourseBorderDirective],
			providers: [{provide: 'moment', useValue: moment}]
		})
		.createComponent(TestCourseItemComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should validate as current course', () => {
		component.courseDate = moment().subtract(13, 'days').toDate();
		fixture.detectChanges();
		let div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;

		expect(div.classList.contains('current-course')).toBe(true);
	});

	it('should validate as future course', () => {
		component.courseDate = moment().add(10, 'days').toDate();
		fixture.detectChanges();
		let div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;

		expect(div.classList.contains('future-course')).toBe(true);
	});

	it('should validate nothing changed', () => {
		component.courseDate = moment().subtract(20, 'days').toDate();
		fixture.detectChanges();
		let div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;

		expect(div.classList.length).toBe(0);
	});
});


