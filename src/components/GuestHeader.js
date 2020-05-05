import React from 'react'
import { NavLink } from 'react-router-dom'
const GuestHeader = () => (
  <div id="header">
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#NavbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a href="/" className="navbar-brand">
          <span className="navbar-logo">ofatri</span>
        </a>
        <div className="collapse navbar-collapse" id="NavbarMenu">
          <ul className="navbar-nav ml-auto">
            <li data-toggle="collapse" data-target="#NavbarMenu">
              <NavLink
                className="nav-link"
                to="/signup"
                activeClassName="is-active"
                exact={true}
              >
                Sign Up
              </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#NavbarMenu">
              <NavLink
                className="nav-link"
                to="/signin"
                activeClassName="is-active"
                exact={true}
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default GuestHeader