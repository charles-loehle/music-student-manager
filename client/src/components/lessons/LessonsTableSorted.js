import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import LessonContext from '../../context/lesson/lessonContext';
import LessonTableData from './LessonTableData';
import Spinner from '../layout/Spinner';

const LessonsTableSorted = () => {
	const lessonContext = useContext(LessonContext);
	const { lessons, filtered, getLessons, loading } = lessonContext;

	// populate the page with list of lessons
	useEffect(() => {
		getLessons();

		// eslint-disable-next-line
	}, []);

	if (lessons !== null && lessons.length === 0 && !loading) {
		return <h4>Please add a lesson</h4>;
	}

	// console.log(lessons);

	return (
		<div className="LessonsTableSorted">
			<h2>
				<i className="fas fa-music"></i> Recent Lessons
			</h2>
			<div className="table-responsive">
				<table className="table table-striped table-sm">
					<thead>
						<tr>
							<th>Lesson Slot</th>
							<th>Student Name</th>
							<th>Assignment</th>
							<th>Attendance</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{lessons !== null && !loading ? (
							// map through live search results
							filtered !== null ? (
								filtered.map(lesson => (
									<LessonTableData key={lesson._id} lesson={lesson} />
								))
							) : (
								// limit lessons to 4
								lessons
									.filter((lesson, index) => index < 4)
									.sort()
									.map(lesson => {
										// console.log(lesson);
										//console.log(moment(lesson.lessonSlot.format('h:mm a')));
										return <LessonTableData key={lesson._id} lesson={lesson} />;
									})
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

export default LessonsTableSorted;
