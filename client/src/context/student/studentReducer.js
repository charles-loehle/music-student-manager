import {
	GET_STUDENTS,
	GET_STUDENT,
	ADD_STUDENT,
	DELETE_STUDENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_STUDENT,
	FILTER_STUDENTS,
	CLEAR_STUDENTS,
	CLEAR_FILTER,
	STUDENT_ERROR,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_STUDENTS:
			return {
				...state,
				students: action.payload,
				loading: false,
			};
		case GET_STUDENT:
			// console.log(action.payload);
			return {
				...state,
				student: action.payload,
			};
		case ADD_STUDENT:
			return {
				...state,
				students: [action.payload, ...state.students],
				loading: false,
			};
		case DELETE_STUDENT:
			//console.log('DELETE_STUDENT');
			return {
				...state,
				students: state.students.filter(
					student => student._id !== action.payload
				),
				loading: false,
			};
		case CLEAR_STUDENTS:
			return {
				...state,
				students: null,
				filtered: null,
				error: null,
				current: null,
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case UPDATE_STUDENT:
			// console.log(action.payload);
			return {
				...state,
				students: state.students.map(student =>
					student._id === action.payload._id ? action.payload : student
				),
				loading: false,
			};
		case FILTER_STUDENTS:
			// filter students by name or email
			return {
				...state,
				filtered: state.students.filter(student => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return student.name.match(regex) || student.email.match(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case STUDENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
