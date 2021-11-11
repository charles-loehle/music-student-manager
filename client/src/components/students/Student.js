import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import StudentLesson from './StudentLesson';
import { v4 as uuidv4 } from 'uuid';

//import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';

const Student = ({ match }) => {
	//const authContext = useContext(AuthContext);
	const studentContext = useContext(StudentContext);
	const { student, getStudentById } = studentContext;

	useEffect(() => {
		//authContext.loadUser();

		getStudentById(match.params.id);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="Student card">
			<div className="container-fluid">
				<div className="row">
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						{student !== null ? (
							<>
								<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
									<h1>{student.name}'s Lessons</h1>
								</div>
								<ul className="list-group list-group-flush">
									{student.lessons.map(lesson => (
										<StudentLesson key={uuidv4()} lesson={lesson} />
									))}
								</ul>

								<div className="card-body">
									<Link className="btn btn-dark" to="/dashboard">
										Back
									</Link>
								</div>
							</>
						) : (
							<Spinner />
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Student;
