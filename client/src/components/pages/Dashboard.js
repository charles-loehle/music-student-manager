import React, { useContext, useEffect } from 'react';
import LessonsTableSorted from '../lessons/LessonsTableSorted';
import StudentsTable from '../students/StudentsTable';
import Alerts from '../layout/Alerts';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="Dashboard container-fluid">
			<div className="row">
				<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
					<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
						<h1 className="h2">Dashboard</h1>
						<div className="btn-toolbar mb-2 mb-md-0">
							<div className="btn-group mr-2">
								<Link
									to="/create-student"
									className="btn btn-sm btn-outline-secondary"
								>
									<i className="fas fa-plus-square"></i> Add Student
								</Link>
								<Link
									to="/create-lesson"
									className="btn btn-sm btn-outline-secondary"
								>
									<i className="fas fa-plus-square"></i> Add Lesson
								</Link>
							</div>
						</div>
					</div>
					<Alerts />
					<LessonsTableSorted />
					{/* <StudentsTable /> */}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
