import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import StudentContext from '../../context/student/studentContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

Modal.setAppElement('#root');
const StudentTableData = ({ student }) => {
	const studentContext = useContext(StudentContext);
	const alertContext = useContext(AlertContext);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { deleteStudent, setCurrent, clearCurrent } = studentContext;
	const { setAlert } = alertContext;

	const { _id, name, parentName, email, alternateEmail, phone, instrument } =
		student;

	const onDelete = () => {
		deleteStudent(_id);
		setModalIsOpen(false);
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
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(128,128,128,0.3)',
					},
					content: {
						top: '102px',
						left: '103px',
						right: '103px',
						bottom: '275px',
					},
				}}
			>
				<h2>Are you sure you want to delete this student and their lessons?</h2>
				<p>This action cannot be undone</p>
				<div>
					<button onClick={onDelete}>Delete Student</button>
					<button onClick={() => setModalIsOpen(false)}>Cancel</button>
				</div>
			</Modal>

			<td>{name}</td>
			<td>{instrument}</td>
			<td>{parentName}</td>
			<td>{email}</td>
			<td>{alternateEmail}</td>
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
					{/* <button
            className='btn btn-danger btn-sm'
            onClick={() => setModalIsOpen(true)}
          >
            Delete
          </button>
          <Link to={`/student/${_id}`} className='btn btn-secondary'>
            Lessons
          </Link>
          <Link
            onClick={onNewLesson}
            className='btn btn-secondary'
            to='/create-lesson'
          >
            New Lesson
          </Link> */}
				</div>
			</td>
		</tr>
	);
};

StudentTableData.propTypes = {
	student: PropTypes.object.isRequired,
};

export default StudentTableData;
