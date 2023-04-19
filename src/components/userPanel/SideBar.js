import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="left-sidebar-container text-white mh-100 p-4">
      <i className="fa fa-fighter-jet" aria-hidden="true"></i>
      <nav className="navbar navbar-expand navbar-dark">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <i className="fas fa-home"></i>
              {/* Home */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/booked-flights" className="nav-link">
              <i className="fas fa-book"></i>
              {/* WeeklyTodos */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/canceled-flights" className="nav-link">
              <i className="fas fa-times-circle"></i>
              {/* GratitudeLog */}
            </NavLink>
          </li>
        </ul>
      </nav>

      <NavLink to="/logout" className="nav-link text-white">
        <i className="fas fa-sign-out-alt"></i>
        {/* HabitTracker */}
      </NavLink>
    </div>
  );
}

export default Sidebar;
