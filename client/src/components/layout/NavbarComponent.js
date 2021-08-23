import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';

// import { NavLink as RRNavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';

const NavbarComponent = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const studentContext = useContext(StudentContext);
	const lessonContext = useContext(LessonContext);

	const { isAuthenticated, logout } = authContext;
	const { clearStudents } = studentContext;
	const { clearLessons } = lessonContext;

	const onLogout = () => {
		logout();
		clearStudents();
		clearLessons();
	};

	// const [isOpen, setIsOpen] = useState(false);

	// const toggle = () => setIsOpen(!isOpen);

	// const authLinks = (
	//   <Fragment>
	//     <li>
	//       <Link
	//         onClick={clearCurrent}
	//         className='btn btn-light'
	//         to='/create-student'
	//       >
	//         New Student
	//       </Link>
	//     </li>
	//     <li>Hello {user && user.name}</li>
	//     <li>
	//       <a onClick={onLogout} href='#!'>
	//         <i className='fas fa-sign-out-alt'></i>
	//         <span> Logout</span>
	//       </a>
	//     </li>
	//   </Fragment>
	// );

	const authLinks = (
		<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
			<a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
				Company name
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
			<input
				className="form-control form-control-dark w-100"
				type="text"
				placeholder="Search"
				aria-label="Search"
			></input>
			<ul className="navbar-nav px-3">
				<li className="nav-item text-nowrap">
					<a className="nav-link" href="#">
						Sign out
					</a>
				</li>
			</ul>
		</nav>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="Navbar navbar bg-primary">
			<h1>
				<i className={icon}></i> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

NavbarComponent.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
};

NavbarComponent.defaultProps = {
	title: 'Music Lesson Tracker',
	icon: 'fas fa-id-card-alt',
};

export default NavbarComponent;
