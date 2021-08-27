import React, { useContext, useEffect } from 'react';
import LessonContext from '../../context/lesson/lessonContext';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import userIcon from '../../img/user-icon-placeholder.png';

const Lesson = ({ match }) => {
	const lessonContext = useContext(LessonContext);
	const { lesson, getLessonById } = lessonContext;

	useEffect(() => {
		getLessonById(match.params.id);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="Lesson">
			<div className="container-fluid">
				<div className="row">
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1>Lesson Details</h1>
						</div>
						<div className="container">
							{lesson !== null ? (
								<div className="card mb-3" style={{ maxWidth: '540px' }}>
									<div className="row g-0">
										<div className="col-md-4">
											<img
												src={userIcon}
												alt=""
												className="img-fluid rounded-start"
											/>
										</div>
										<div className="col-md-8">
											<div className="card-body">
												<h5 className="card-title">{lesson.student.name}</h5>
												<p className="card-text">
													<span
														className={
															'badge p-1 ' +
															(lesson.attendance === 'present'
																? 'badge-success'
																: 'badge-danger')
														}
													>
														{lesson.attendance}
													</span>
												</p>
												<p className="card-text text-muted">
													{moment(lesson.lessonSlot).format(
														'dddd MMMM Do YYYY, h:mm a'
													)}
												</p>
												<p class="card-text">
													Notes:{' '}
													<small class="text-muted">{lesson.assignment}</small>
												</p>
												<p class="card-text">
													Created on:{' '}
													<small class="text-muted">
														{moment(lesson.createdAt).format(
															'dddd MMMM Do YYYY, h:mm a'
														)}
													</small>
												</p>
												<Link to="/dashboard">Back</Link>
											</div>
										</div>
									</div>
								</div>
							) : (
								<Spinner />
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Lesson;
