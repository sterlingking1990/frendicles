import React from 'react'
import { NavLink } from 'react-router-dom'
import { withFirebase } from '../firebase'
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
          <span className="navbar-logo">ofatri Standard</span>
        </a>
        <div className="collapse navbar-collapse" id="NavbarMenu">
          <ul className="navbar-nav ml-auto">
            <li data-toggle="collapse" data-target="#NavbarMenu">
              <NavLink className="nav-link" to="/" activeClassName="is-active">
                Home
              </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#NavbarMenu">
              <NavLink to="/create-offer" className="nav-link" activeClassName="is-active">
                Create Offer
              </NavLink>
            </li>
            {/* <li className="nav-item"><NavLink className="nav-link" to="/offer" activeClassName="is-active" exact={true}>Join Offer</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/my-transactions" activeClassName="is-active" exact={true}>My Rewards</NavLink></li> */}

            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Reward Customer
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/offer-analytics"
                    activeClassName="is-active"
                  >
                    Your Customers
                  </NavLink>
                </li>
                {/* <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/close-reward"
                    activeClassName="is-active"
                  >
                    Close Reward
                  </NavLink>
                </li> */}
                {/* <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/verify-payment"
                    activeClassName="is-active"
                  >
                    Verify Payment
                  </NavLink>
                </li> */}
              </ul>
            </li>

            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Settings
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                {/* <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/set-reward-limit"
                    activeClassName="is-active"
                  >
                    Set Reward Limit
                  </NavLink>
                </li>
                <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/set-reward-type"
                    activeClassName="is-active"
                  >
                    Set Reward Type
                  </NavLink>
                </li> */}
                <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/admin-setup-goal"
                    activeClassName="is-active"
                  >
                    Set Goal
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
                {/* <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/ofatri-balance"
                    activeClassName="is-active"
                  >
                    Ofatri Balance
                  </NavLink>
                </li> */}
                <li></li>
                <li data-toggle="collapse" data-target="#NavbarMenu">
                  <NavLink
                    className="nav-link"
                    to="/change-password"
                    activeClassName="is-active"
                  >
                    Change Password
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