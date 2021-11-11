import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../layout/SidebarMenu';
//import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import StudentContext from '../../context/student/studentContext';

const CreateStudent = props => {
	//const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const studentContext = useContext(StudentContext);

	// useEffect(() => {
	// 	authContext.loadUser();
	// 	// eslint-disable-next-line
	// }, []);

	const { addStudent, current, clearCurrent } = studentContext;
	const { setAlert } = alertContext;

	const [student, setStudent] = useState({
		name: '',
		parentName: '',
		email: '',
		// alternateEmail: '',
		phone: '',
		// lessonSlot: '',
		// assignment: '',
		instrument: '',
		// attendance: '',
	});

	const clearAll = () => {
		clearCurrent();
	};

	const {
		name,
		parentName,
		email,
		// alternateEmail,
		phone,
		// lessonSlot,
		// assignment,
		instrument,
		// attendance,
	} = student;

	const onSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addStudent(student);
			setAlert('Student Added', 'success');
		}

		// clear the form
		clearAll();

		// redirect back to home page after submit
		props.history.push('/dashboard');
	};

	const onChange = e =>
		setStudent({ ...student, [e.target.name]: e.target.value });

	return (
		<div className="CreateStudent mb-5">
			<div className="container-fluid mt-3">
				<div className="row">
					<SidebarMenu />
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2">
							<h2 className="h4 mb-0">Create New Student</h2>
						</div>
						<div className="card col-sm-8 col-lg-6 mx-auto">
							<div className="card-body">
								<form onSubmit={onSubmit}>
									<div className="form-group">
										<label className="text-muted col-form-label">Name</label>
										<div>
											<input
												type="text"
												name="name"
												placeholder="Student's name"
												value={name}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="text-muted col-form-label">
											Parent Name
										</label>
										<div>
											<input
												type="text"
												name="parentName"
												placeholder="Student's parent or guardian"
												value={parentName}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									<div className="form-group">
										<label
											htmlFor="inputPassword3"
											className="text-muted col-form-label"
										>
											Email
										</label>
										<div>
											<input
												type="email"
												name="email"
												placeholder="Parent's email"
												value={email}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div>
									{/* <div className="form-group">
										<label
											htmlFor="inputPassword3"
											className="text-muted col-form-label"
										>
											Alternate Email
										</label>
										<div>
											<input
												type="email"
												name="alternateEmail"
												placeholder="Parent's alternate email"
												value={alternateEmail}
												onChange={onChange}
												className="form-control"
											/>
										</div>
									</div> */}
									<div className="form-group">
										<label
											htmlFor="inputPassword3"
											className="text-muted col-form-label"
										>
											Phone
										</label>
										<div>
											<input
												type="text"
												name="phone"
												placeholder="Parent's phone"
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
									<div>
										<div>
											<button
												type="submit"
												className="btn btn-primary btn-block mb-2"
											>
												Create Student
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

export default CreateStudent;
