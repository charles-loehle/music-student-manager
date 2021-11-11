import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../layout/SidebarMenu';
import AlertContext from '../../context/alert/alertContext';
//import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';

// pass in props to use onSubmit to redirect
const EditStudent = props => {
	//const authContext = useContext(AuthContext);
	const studentContext = useContext(StudentContext);
	const alertContext = useContext(AlertContext);

	const { deleteStudent, setCurrent, current, clearCurrent, updateStudent } =
		studentContext;

	const { setAlert } = alertContext;

	// const [student, setStudent] = useState({
	// 	name: '',
	// 	parentName: '',
	// 	email: '',
	// 	alternateEmail: '',
	// 	phone: '',
	// 	instrument: '',
	// });

	const [student, setStudent] = useState({
		name: '',
		parentName: '',
		email: '',
		phone: '',
		instrument: '',
	});

	// destructure student state from useState which now includes _id set by useEffect
	// const { _id, name, parentName, email, alternateEmail, phone, instrument } =
	// 	student;

	const { _id, name, parentName, email, phone, instrument } = student;

	// populate the form with student data on edit button click and authenticate the user
	useEffect(() => {
		//authContext.loadUser();

		if (current !== null) {
			// if current is populated, get data from current and set student state with it
			const newCurrent = {
				...current,
			};
			setStudent(newCurrent);
			// console.log(student);
		} else {
			setStudent({
				name: '',
				parentName: '',
				email: '',
				alternateEmail: '',
				phone: '',
				instrument: '',
			});
		}
		// pass in empty array of dependencies to avoid infinite loop
	}, []);

	const onDelete = () => {
		deleteStudent(_id);
		//setModalIsOpen(false);
		clearCurrent();
		// redirect back to home page after submit
		props.history.push('/students');
		setAlert('Student Deleted', 'danger');
	};

	const onNewLesson = () => {
		setCurrent(student);
	};

	const clearAll = () => {
		clearCurrent();
	};

	// set state with student form data
	const onChange = e =>
		setStudent({ ...student, [e.target.name]: e.target.value });

	// update student with student data from state then redirect
	const onSubmit = async e => {
		e.preventDefault();
		// update student data
		if (current !== null) {
			await updateStudent(student);
			setAlert('Student Updated', 'success');
		}
		// set current back to null
		clearAll();
		// redirect back to home page after submit
		props.history.push('/students');
	};

	return (
		<div className="EditStudent">
			<div className="container-fluid mt-3 mb-5">
				<div className="row">
					<SidebarMenu />
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2">
							<h1>Edit Student</h1>
						</div>
						<div className="card col-sm-8 col-lg-6 mx-auto">
							<div className="card-body mt-3">
								<form onSubmit={onSubmit}>
									<div className="form-group">
										<label className="text-muted">Name</label>
										<div>
											<input
												type="text"
												name="name"
												value={name}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="text-muted">Parent Name</label>
										<div>
											<input
												type="text"
												name="parentName"
												value={parentName}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="inputPassword3" className="text-muted">
											Email
										</label>
										<div>
											<input
												type="email"
												name="email"
												value={email}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									{/* <div className="form-group">
										<label htmlFor="inputPassword3" className="text-muted">
											Alternate Email
										</label>
										<div>
											<input
												type="email"
												name="alternateEmail"
												value={alternateEmail}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div> */}
									<div className="form-group">
										<label htmlFor="inputPassword3" className="text-muted">
											Phone
										</label>
										<div>
											<input
												type="text"
												name="phone"
												value={phone}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<fieldset className="form-group">
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
														className="form-check-label"
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
														className="form-check-label"
														htmlFor="gridRadios2"
													>
														Guitar
													</label>
												</div>
											</div>
										</div>
									</fieldset>

									<div className="form-group">
										<div>
											<button
												type="submit"
												className="btn btn-primary btn-block mb-2"
											>
												Update Student
											</button>
											<Link onClick={clearAll} to="/students">
												Back
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
						{/* <Link
							onClick={onNewLesson}
							className="btn btn-dark mr-1 my-1"
							to="/create-lesson"
						>
							New Lesson
						</Link> */}
						{/* <button
							className="btn btn-danger mr-1 my-1"
							onClick={() => setModalIsOpen(true)}
						>
							Delete Student
						</button> */}
					</main>
				</div>
			</div>
		</div>
	);
};

export default EditStudent;
