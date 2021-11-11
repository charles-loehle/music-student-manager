import React, { useContext, useEffect } from 'react';
import LessonItem from './LessonItem';
import LessonsTable from './LessonsTable';
import SidebarMenu from '../layout/SidebarMenu';
import LessonContext from '../../context/lesson/lessonContext';
import Spinner from '../layout/Spinner';

const Lessons = () => {
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

	return (
		<div className="Lessons">
			<div className="container-fluid">
				<div className="row">
					<SidebarMenu />
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
							<h1>Lessons</h1>
						</div>
						{lessons !== null && !loading ? (
							// map through live search results
							filtered !== null ? (
								filtered
									.map(lesson => (
										<LessonItem key={lesson._id} lesson={lesson} />
									))
									.sort((a, b) => a - b)
							) : (
								// lessons.map(lesson => (
								// 	<LessonItem key={lesson._id} lesson={lesson} />
								// ))
								<LessonsTable />
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

export default Lessons;
