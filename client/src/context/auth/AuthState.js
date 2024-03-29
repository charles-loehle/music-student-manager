import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Get user from backend
	const loadUser = async () => {
		// creates a config default that will be applied to every request - a global header
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			// Get logged in user to allow access to protected routes. Sends back res.json(user)
			const res = await axios.get('/api/auth');

			dispatch({
				type: USER_LOADED,
				// res.data is the token
				payload: res.data,
			});
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// Register user
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// POST api/users  register user
			const res = await axios.post('/api/users', formData, config);
			// console.log(res);
			dispatch({
				type: REGISTER_SUCCESS,
				// res.data is the token
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Login user
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	// Clear errors
	const clearErrors = async () => {
		dispatch({
			type: CLEAR_ERRORS,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				register,
				logout,
				clearErrors,
				login,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
