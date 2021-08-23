import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import './scss/_custom.scss';
import './components/pages/Dashboard.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
