import { Course } from './../models/course.models';
import * as course from './../actions/course.action';

export interface State {
	courses: Course[];
	curCourse?: Course;
}

export function reducer(state: State = {} as any, action: course.Actions): State {
	switch (action.type) {
		case course.COURSES_COMPLETE: {
			if (state.courses) {
				return { courses: state.courses.concat(action.payload) };
			}else {
				return {courses: action.payload};
			}
		}
		case course.FOUND_COURSES_COMPLETE: {
			return {courses: action.payload};
		}
		case course.CHANGE_COMPLETE: {
			return {courses: undefined};
		}
		case course.GET_COURSE_COMPLETE: {
			return {courses: state.courses, curCourse: action.payload};
		}
		default: return state;
	}
}
