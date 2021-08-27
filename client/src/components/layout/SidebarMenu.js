import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
	return (
		<div className="SidebarMenu">
			<nav
				id="sidebarMenu"
				className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
			>
				<div className="sidebar-sticky pt-3">
					<ul className="nav flex-column">
						<li className="nav-item">
							<Link className="nav-link" to="/dashboard">
								<i className="fas fa-home"></i> Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/students">
								<i className="fas fa-users"></i> All Students
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/lessons">
								<i className="fas fa-music"></i> All Lessons
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default SidebarMenu;
