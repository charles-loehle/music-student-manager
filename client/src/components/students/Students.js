import React, { useContext, useEffect } from 'react';
import StudentItem from './StudentItem';
import StudentsTable from './StudentsTable';
import SidebarMenu from '../layout/SidebarMenu';
import StudentContext from '../../context/student/studentContext';
import Spinner from '../layout/Spinner';

const Students = () => {
	const studentContext = useContext(StudentContext);
	const { students, filtered, getStudents, loading } = studentContext;

	// populate the page with list of students
	useEffect(() => {
		getStudents();
		// eslint-disable-next-line
	}, []);

	if (students !== null && students.length === 0 && !loading) {
		return <h4>Please add a student</h4>;
	}

	return (
		<div className="Students">
			<div className="DashboardTest container-fluid">
				<div className="row">
					<SidebarMenu />
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1>Students</h1>
						</div>
						{students !== null && !loading ? (
							// map through live search results
							filtered !== null ? (
								filtered.map(student => (
									<StudentItem key={student._id} student={student} />
								))
							) : (
								// students.map((student) => (
								//   <StudentItem key={student._id} student={student} />
								// ))

								<StudentsTable />
							)
						) : (
							<Spinner />
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Students;
