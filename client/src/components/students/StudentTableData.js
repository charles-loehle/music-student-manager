import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import StudentContext from '../../context/student/studentContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const StudentTableData = ({ student }) => {
	const studentContext = useContext(StudentContext);
	const alertContext = useContext(AlertContext);

	const { deleteStudent, setCurrent, clearCurrent } = studentContext;
	const { setAlert } = alertContext;

	// const { _id, name, parentName, email, alternateEmail, phone, instrument } =
	// 	student;

	const { _id, name, parentName, email, phone, instrument } = student;

	const onDelete = () => {
		// console.log('Student deleted');
		deleteStudent(_id);
		clearCurrent();
		setAlert('Student Deleted', 'danger');
	};

	// send student data to context state to populate the form in EditStudent.js
	const onEdit = () => {
		setCurrent(student);
	};

	// const onNewLesson = () => {
	//   setCurrent(student);
	// };

	return (
		<tr>
			<td>{name}</td>
			<td>{instrument}</td>
			<td>{parentName}</td>
			<td>{email}</td>
			{/* <td>{alternateEmail}</td> */}
			<td>{phone}</td>
			<td>
				<div className="table-actions" role="group" aria-label="3 buttons">
					<Link
						onClick={onEdit}
						to="/edit-student"
						className="btn btn-outline-secondary"
					>
						Edit
					</Link>
					<button
						type="button"
						className="btn btn-link p-0"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						Delete
					</button>

					<div
						className="modal fade"
						id="exampleModal"
						tabIndex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header border-0">
									<h5 className="modal-title" id="exampleModalLabel">
										Delete student
									</h5>
								</div>
								<div className="modal-body border-0">
									Are you sure you want to delete this student and their
									lessons? This action cannot be undone.
								</div>
								<div className="modal-footer border-0 bg-light">
									<button className="btn btn-light" data-bs-dismiss="modal">
										Cancel
									</button>
									<button
										className="btn btn-danger ml-2"
										onClick={onDelete}
										data-bs-dismiss="modal"
									>
										Delete Student
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</td>
		</tr>
	);
};

StudentTableData.propTypes = {
	student: PropTypes.object.isRequired,
};

export default StudentTableData;
