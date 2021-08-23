import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import LessonContext from '../../context/lesson/lessonContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

Modal.setAppElement('#root');
const LessonTableData = ({ lesson }) => {
	const lessonContext = useContext(LessonContext);
	const alertContext = useContext(AlertContext);

	const {
		// lessons,
		// filtered,
		// getLessons,
		// loading,
		// addLesson,
		deleteLesson,
		setCurrentLesson,
		clearCurrentLesson,
	} = lessonContext;
	const { setAlert } = alertContext;

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { _id, assignment, attendance, lessonSlot, student } = lesson;

	const onDelete = () => {
		deleteLesson(_id);
		setModalIsOpen(false);
		clearCurrentLesson();
		setAlert('Lesson Deleted', 'danger');
	};

	// send lesson data to context state to populate the form in EditLesson.js
	const onEdit = () => {
		setCurrentLesson(lesson);
	};

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
				<h2>Are you sure you want to delete this lesson?</h2>
				<p>This action cannot be undone</p>
				<div>
					<button onClick={onDelete}>Delete Lesson</button>
					<button onClick={() => setModalIsOpen(false)}>Cancel</button>
				</div>
			</Modal>
			<td>{moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}</td>
			<td>{student.name}</td>
			<td>{assignment}</td>
			<td>
				{attendance && (
					<span
						className={
							'badge p-1 ' +
							(attendance === 'present' ? 'badge-success' : 'badge-danger')
						}
					>
						{attendance}
					</span>
				)}
			</td>
			<td>
				<div className="table-actions" role="group" aria-label="3 buttons">
					<Link
						to={`/lesson/${_id}`}
						type="button"
						className="btn btn-outline-secondary"
					>
						View
					</Link>
					<Link
						onClick={onEdit}
						to="/edit-lesson"
						type="button"
						className="btn btn-outline-secondary"
					>
						Edit
					</Link>
					<a href="#" class="link-primary" onClick={() => setModalIsOpen(true)}>
						Delete
					</a>
				</div>
			</td>
		</tr>
	);
};

export default LessonTableData;
