import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

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
import Alerts from './components/layout/Alerts';
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
    <AuthState>
      <StudentState>
        <LessonState>
          <AlertState>
            <Router>
              <div className='App dark-palette'>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute exact path='/students' component={Students} />
                    <PrivateRoute
                      exact
                      path='/student/:id'
                      component={Student}
                    />
                    <PrivateRoute
                      exact
                      path='/create-student'
                      component={CreateStudent}
                    />
                    <PrivateRoute
                      exact
                      path='/edit-student'
                      component={EditStudent}
                    />
                    <PrivateRoute exact path='/lessons' component={Lessons} />
                    <PrivateRoute exact path='/lesson/:id' component={Lesson} />
                    <PrivateRoute
                      exact
                      path='/edit-lesson'
                      component={EditLesson}
                    />
                    <PrivateRoute
                      exact
                      path='/create-lesson'
                      component={CreateLesson}
                    />
                  </Switch>
                </div>
              </div>
            </Router>
          </AlertState>
        </LessonState>
      </StudentState>
    </AuthState>
  );
};

export default App;
