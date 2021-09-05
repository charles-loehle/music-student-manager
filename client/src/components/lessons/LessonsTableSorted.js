import React, { useContext, useEffect } from 'react';
// import moment from 'moment';
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

	// const sortedLessons =
	// 	lessons !== null && !loading
	// 		? lessons.sort((a, b) => {
	// 				var c = new Date(a.lessonSlot);
	// 				var d = new Date(b.lessonSlot);
	// 				return c - d;
	// 		  })
	// 		: lessons;

	// console.log(sortedLessons);

	// const sortLessons = () => {
	// 	if (lessons !== null && !loading) {
	// 		// console.log(typeof new Date(lessons[0].lessonSlot));
	// 		const items = lessons.sort((a, b) => {
	// 			var c = new Date(a.lessonSlot);
	// 			var d = new Date(b.lessonSlot);
	// 			return d - c;
	// 		});

	// 		console.log(items);

	// 		return items
	// 			.filter((lesson, index) => index < 5)
	// 			.map(lesson => {
	// 				return <LessonTableData key={lesson._id} lesson={lesson} />;
	// 			});
	// 	}
	// };

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
								// // limit lessons to 4
								lessons
									.filter((lesson, index) => index < 5)
									.map(lesson => {
										// console.log(typeof lesson.lessonSlot); // string
										// const dateObj = new Date(lesson.lessonSlot);
										// console.log(typeof dateObj); // object
										return <LessonTableData key={lesson._id} lesson={lesson} />;
									})
								// sortLessons()
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
