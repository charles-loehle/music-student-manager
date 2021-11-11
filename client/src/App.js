import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavbarComponent from './components/layout/NavbarComponent';
import NavbarTestComponent from './components/layout/NavbarTestComponent';
// import Home from './components/pages/Home';
import About from './components/pages/About';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';

import Students from './components/students/Students';
import Student from './components/students/Student';
import CreateStudent from './components/students/CreateStudent';
import EditStudent from './components/students/EditStudent';

import Lessons from './components/lessons/Lessons';
import Lesson from './components/lessons/Lesson';
import EditLesson from './components/lessons/EditLesson';
import CreateLesson from './components/lessons/CreateLesson';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import Alerts from './components/layout/Alerts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';

import StudentState from './context/student/StudentState';
import LessonState from './context/lesson/LessonState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		// <AuthState>
		<StudentState>
			<LessonState>
				<AlertState>
					<Router>
						<div className="App">
							{/* <NavbarComponent /> */}
							<NavbarTestComponent />
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/about" component={About} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
								<Route exact path="/dashboard" component={Dashboard} />
								{/* <PrivateRoute exact path="/students" component={Students} /> */}
								<Route exact path="/students" component={Students} />
								{/* <PrivateRoute exact path="/student/:id" component={Student} /> */}
								<Route exact path="/student/:id" component={Student} />
								{/* <PrivateRoute
									exact
									path="/create-student"
									component={CreateStudent}
								/> */}
								<Route exact path="/create-student" component={CreateStudent} />
								{/* <PrivateRoute
									exact
									path="/edit-student"
									component={EditStudent}
								/> */}
								<Route exact path="/edit-student" component={EditStudent} />
								{/* <PrivateRoute exact path="/lessons" component={Lessons} /> */}
								<Route exact path="/lessons" component={Lessons} />
								{/* <PrivateRoute exact path="/lesson/:id" component={Lesson} /> */}
								<Route exact path="/lesson/:id" component={Lesson} />
								{/* <PrivateRoute
									exact
									path="/edit-lesson"
									component={EditLesson}
								/> */}
								<Route exact path="/edit-lesson" component={EditLesson} />
								{/* <PrivateRoute
									exact
									path="/create-lesson"
									component={CreateLesson}
								/> */}
								<Route exact path="/create-lesson" component={CreateLesson} />
							</Switch>
						</div>
					</Router>
				</AlertState>
			</LessonState>
		</StudentState>
		// </AuthState>
	);
};

export default App;
