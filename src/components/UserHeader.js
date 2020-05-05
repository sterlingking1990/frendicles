import React from 'react'
import { NavLink } from 'react-router-dom'
import {withFirebase} from '../firebase'
import SignOutUser from './SignOutUser'
const UserHeader = () => (
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
            <li className="nav-item" data-target="navbar-collapse-show">
              <NavLink
                className="nav-link"
                data-toggle="collapse"
                data-target="#NavbarMenu"
                to="/"
                activeClassName="is-active"
                exact={true}
              >
                Home
              </NavLink>
            </li>
            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Offer
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/offer"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Join Offer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/offer-analytics"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Offer Analytics
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                RewardnGoal
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/my-transactions"
                    activeClassName="is-active"
                    exact={true}
                  >
                    My Rewards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/set-reward-goal"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Set Reward Goal
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/check-milestone"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Check Milestone
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Account
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/set-notification"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Notification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/change-password"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    data-toggle="collapse"
                    data-target="#NavbarMenu"
                    to="/change-phone"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Update Contact
                  </NavLink>
                </li>
                <li>
                  <SignOutUser />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default withFirebase(UserHeader)