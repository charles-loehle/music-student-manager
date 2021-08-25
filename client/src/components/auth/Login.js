import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const Login = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			// redirect to the dashboard page, Home.js
			props.history.push('/dashboard');
		}

		if (error === 'Invalid credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		// check all fields are complete
		if (email === '' || password === '') {
			setAlert('Please fill in all fields', 'danger');
			// check for valid email format
		} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setAlert('Please enter a valid email', 'danger');
		} else {
			login({ email, password });
		}
	};

	return (
		<div className="Login">
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<main role="main" className="col-sm-9 col-md-8 col-lg-6">
						<div className="pt-3 pb-2 mb-3">
							<Alerts />
							<h1 className="h3 mb-3 font-weight-normal text-center">
								Account Login
							</h1>
							<div className="card">
								<div className="card-body">
									<form onSubmit={onSubmit}>
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
											/>
										</div>
										<button
											type="submit"
											className="btn btn-lg btn-primary btn-block"
										>
											Log in
										</button>
										<p className="text-muted mt-2">
											Need an account?{' '}
											<Link to="/register" className="text-info">
												Sign Up
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

export default Login;
