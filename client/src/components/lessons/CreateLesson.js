import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';

const CreateLesson = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const lessonContext = useContext(LessonContext);
	const studentContext = useContext(StudentContext);

	const { setAlert } = alertContext;
	const { students, getStudents, current, clearCurrent, setCurrent, loading } =
		studentContext;
	const { addLesson, clearCurrentLesson } = lessonContext;

	useEffect(() => {
		authContext.loadUser();
		getStudents();
		// eslint-disable-next-line
	}, []);

	// console.log(students);

	const [lesson, setLesson] = useState({
		lessonStudentName: '',
		lessonStudentData: '',
		lessonSlot: '',
		assignment: '',
		instrument: '',
		attendance: '',
	});

	const { lessonStudentName, lessonSlot, assignment, instrument, attendance } =
		lesson;

	const clearAll = () => {
		clearCurrentLesson();
		clearCurrent();
	};

	// console.log(students);

	const onDropDownChange = e => {
		const result = students.filter(student => student.name === e.target.value);

		setLesson({
			...lesson,
			lessonStudentData: result,
			lessonStudentName: e.target.value,
		});
		// https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
		const newLessonObj = { result };
		setCurrent(newLessonObj);
	};

	// set lessonSlot state to date object from DatePicker
	const onChangeDate = date => {
		setLesson({ ...lesson, lessonSlot: date });
	};

	const onChange = e =>
		setLesson({ ...lesson, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (current !== null) {
			addLesson(lesson, current.result[0]._id);
			setAlert('Lesson Added', 'success');
		}
		// clear the form
		clearAll();

		// redirect back to home page after submit
		props.history.push('/dashboard');
	};

	// console.log(students);
	//console.log(loading);

	return (
		<div className="CreateLesson mb-5">
			<div className="container-fluid mt-3">
				<div className="row">
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2">
							<h2 className="h4 mb-0">Create a New Lesson</h2>
						</div>
						<div className="card col-sm-8 col-lg-6 mx-auto">
							<div className="card-body mt-3">
								<form onSubmit={onSubmit}>
									<div className="form-group">
										<div>
											{students !== null && !loading ? (
												<select
													className="custom-select"
													value={lessonStudentName}
													onChange={onDropDownChange}
													name="lessonStudentName"
												>
													<option value="Choose a student">
														Choose a student
													</option>
													{students.map(student => (
														<option key={student._id} value={student.name}>
															{student.name}
														</option>
													))}
												</select>
											) : (
												<Spinner />
											)}
											{/* <select
												className="custom-select"
												value={lessonStudentName}
												onChange={onDropDownChange}
												name="lessonStudentName"
											>
												<option value="Choose a student">
													Choose a student
												</option>
												{students.map(student => (
													<option key={student._id} value={student.name}>
														{student.name}
													</option>
												))}
											</select> */}
										</div>
									</div>
									<div className="form-group">
										<label className="text-muted col-form-label">
											Lesson Date
										</label>
										<div>
											<DatePicker
												placeholderText="Click to select a date and time"
												selected={lessonSlot}
												onChange={onChangeDate}
												showTimeSelect
												dateFormat="MMMM d, yyyy h:mm aa"
												className="form-control block"
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="text-muted col-form-label">
											Assignment
										</label>
										<div>
											<input
												type="text"
												placeholder="Assignment"
												name="assignment"
												value={assignment}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<div className="container">
										<div className="row">
											<fieldset className="form-group col-sm-6">
												<div>
													<legend className="text-muted col-form-label pt-0">
														Instrument
													</legend>
													<div>
														<div className="form-check">
															<input
																className="form-check-input"
																type="radio"
																name="instrument"
																value="violin"
																checked={instrument === 'violin'}
																onChange={onChange}
															/>
															<label
																className="text-muted form-check-label"
																htmlFor="gridRadios1"
															>
																Violin
															</label>
														</div>
														<div className="form-check">
															<input
																className="form-check-input"
																type="radio"
																name="instrument"
																value="guitar"
																checked={instrument === 'guitar'}
																onChange={onChange}
															/>
															<label
																className="text-muted form-check-label"
																htmlFor="gridRadios2"
															>
																Guitar
															</label>
														</div>
													</div>
												</div>
											</fieldset>

											<fieldset className="form-group col-sm-6">
												<div>
													<legend className="text-muted col-form-label pt-0">
														Attendance
													</legend>
													<div>
														<div className="form-check">
															<input
																className="form-check-input"
																type="radio"
																name="attendance"
																value="present"
																checked={attendance === 'present'}
																onChange={onChange}
															/>
															<label
																className="text-muted form-check-label"
																htmlFor="gridRadios1"
															>
																Present
															</label>
														</div>
														<div className="form-check">
															<input
																className="form-check-input"
																type="radio"
																name="attendance"
																value="absent"
																checked={attendance === 'absent'}
																onChange={onChange}
															/>
															<label
																className="text-muted form-check-label"
																htmlFor="gridRadios2"
															>
																Absent
															</label>
														</div>
													</div>
												</div>
											</fieldset>
										</div>
									</div>
									<div className="form-group">
										<div>
											<button
												type="submit"
												className="btn btn-primary btn-block mb-2"
											>
												Add Lesson
											</button>
											<Link onClick={clearCurrent} to="/dashboard">
												Back to dashboard
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default CreateLesson;
