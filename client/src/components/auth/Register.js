import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const Register = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/dashboard');
		}
		// Backend validation:
		// if POST api/users in routes/users.js sends back the error
		if (error === 'User already exists') {
			setAlert(error, 'danger');
			// console.log(error);
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		// Frontend validation
		if (name === '' || email === '' || password === '') {
			setAlert('Please fill in all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
			// check for valid email format
		} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setAlert('Please enter a valid email', 'danger');
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className="Register">
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<main role="main" className="col-sm-9 col-md-8 col-lg-6">
						<div className="pt-3 pb-2 mb-3">
							<Alerts />
							<h1 className="h3 mb-3 font-weight-normal text-center">
								Sign Up, It's Free
							</h1>
							<h3 className="text-muted text-center h5 mb-3 font-weight-normal">
								Organize your lesson studio
							</h3>
							<div className="card">
								<div className="card-body">
									<form onSubmit={onSubmit}>
										<div className="form-group">
											<label className="text-muted" htmlFor="name">
												Name
											</label>
											<input
												type="text"
												name="name"
												className="form-control"
												placeholder="Name"
												value={name}
												onChange={onChange}
											/>
										</div>
										<div className="form-group">
											<label className="text-muted" htmlFor="email">
												Email
											</label>
											<input
												type="email"
												name="email"
												className="form-control"
												placeholder="Email address"
												value={email}
												onChange={onChange}
											/>
										</div>
										<div className="form-group">
											<label className="text-muted" htmlFor="password">
												Password
											</label>
											<input
												type="password"
												name="password"
												className="form-control"
												placeholder="Password"
												value={password}
												onChange={onChange}
												minLength="6"
											/>
										</div>
										<div className="form-group">
											<label className="text-muted" htmlFor="password2">
												Verify Password
											</label>
											<input
												type="password"
												name="password2"
												className="form-control"
												placeholder="Confirm Password"
												value={password2}
												onChange={onChange}
												minLength="6"
											/>
										</div>
										<button
											type="submit"
											value="Create My Account"
											className="btn btn-lg btn-primary btn-block"
										>
											Create My Account
										</button>
										<p className="text-muted mt-2">
											Already have an account?{' '}
											<Link to="/login" className="text-info">
												Login
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Register;
