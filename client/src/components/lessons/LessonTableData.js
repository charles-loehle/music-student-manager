import React, { useContext, useState } from 'react';
import moment from 'moment';
import LessonContext from '../../context/lesson/lessonContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

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

	const { _id, assignment, attendance, lessonSlot, student } = lesson;

	const onDelete = () => {
		deleteLesson(_id);
		// setModalIsOpen(false);
		clearCurrentLesson();
		setAlert('Lesson Deleted', 'danger');
	};

	// send lesson data to context state to populate the form in EditLesson.js
	const onEdit = () => {
		setCurrentLesson(lesson);
	};

	return (
		<tr>
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
										Delete lesson
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
										Delete Lesson
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

export default LessonTableData;
