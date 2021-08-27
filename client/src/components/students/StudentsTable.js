import React, { useContext, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';
import StudentTableData from './StudentTableData';
import Spinner from '../layout/Spinner';

const StudentsTable = () => {
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
		<div className="StudentsTable">
			<h2>
				<i className="fas fa-users"></i> Students
			</h2>
			<div className="table-responsive">
				<table className="table table-striped table-sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Instrument</th>
							<th>Parent</th>
							<th>Email</th>
							{/* <th>Alt. Email</th> */}
							<th>Phone</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{students !== null && !loading ? (
							// map through live search results
							filtered !== null ? (
								filtered.map(student => (
									<StudentTableData key={student._id} student={student} />
								))
							) : (
								students.map(student => (
									<StudentTableData key={student._id} student={student} />
								))
							)
						) : (
							<Spinner />
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StudentsTable;
