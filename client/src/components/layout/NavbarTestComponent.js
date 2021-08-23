import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';
import './Navbar.css';

const NavbarTestComponent = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const studentContext = useContext(StudentContext);
	const lessonContext = useContext(LessonContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearStudents } = studentContext;
	const { clearLessons } = lessonContext;

	const onLogout = () => {
		logout();
		clearStudents();
		clearLessons();
	};

	const authLinks = (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
			<a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#!">
				<i className={icon}></i> {title}
			</a>
			<button
				className="navbar-toggler position-absolute d-md-none collapsed"
				type="button"
				data-toggle="collapse"
				data-target="#sidebarMenu"
				aria-controls="sidebarMenu"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<ul className="navbar-nav ml-auto px-3">
				<li className="nav-link text-nowrap">Hello {user && user.name}</li>
				<li className="nav-item text-nowrap">
					<a onClick={onLogout} className="nav-link" href="#!">
						<i className="fas fa-sign-out-alt"></i> Sign out
					</a>
				</li>
			</ul>
		</nav>
	);

	const guestLinks = (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<a className="navbar-brand" href="/">
				<i className={icon}></i> {title}
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/register">
							Sign Up
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="login">
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);

	return (
		<div className="NavbarTestComponent">
			{isAuthenticated ? authLinks : guestLinks}
			{isAuthenticated && <SidebarMenu />}
		</div>
	);
};

NavbarTestComponent.propTypes = {
	title: PropTypes.string,
};

NavbarTestComponent.defaultProps = {
	title: 'Music Lesson Tracker',
	icon: 'fas fa-id-card-alt',
};

export default NavbarTestComponent;
