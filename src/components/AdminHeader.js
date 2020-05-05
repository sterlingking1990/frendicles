import React from 'react'
import {NavLink} from 'react-router-dom'
import SignOutUser from './SignOutUser'
const AdminHeader = () => (
  <div id="header">
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container mt-3">
        <button
          className="navbar-toggler"
          data-target="#Navmenu"
          data-toggle="collapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <a href="/" className="navbar-brand">
          <span className="navbar-logo">ofatri</span>
        </a>

        <div className="collapse navbar-collapse" id="Navmenu">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
                        <NavLink to="/hooks-page" className="nav-link">Hooks Page </NavLink>
                        </li> */}
            <li data-toggle="collapse" data-target="#Navmenu">
              <NavLink
                to="/confirm-funcode"
                className="nav-link"
                activeClassName="is-active"
              >
                Confirm FunCode
              </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#Navmenu">
              <NavLink to="/redeem-coin" className="nav-link">
                Redeem Coin
              </NavLink>
            </li>
            {/* <li className="nav-item">
                            <NavLink to="/places-page" className="nav-link">Places Page </NavLink>
                        </li> */}
            {/* <li className="nav-item">
                            <NavLink to="/create-hook" className="nav-link">Create Hook</NavLink>
                        </li> */}
            <li data-toggle="collapse" data-target="#Navmenu">
              <NavLink to="/admin-setup-goal" className="nav-link">
                Setup Goals
              </NavLink>
            </li>

            <li className="dropdown" id="menu-anchor">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Account
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li data-toggle="collapse" data-target="#Navmenu">
                  <NavLink
                    className="nav-link"
                    to="/update-ofatri-account"
                    activeClassName="is-active"
                    exact={true}
                  >
                    Update Ofatri Account
                  </NavLink>
                </li>
                <li data-toggle="collapse" data-target="#Navmenu">
                  <NavLink
                    className="nav-link"
                    to="/users-info"
                    activeClassName="is-active"
                    exact={true}
                  >
                    User Info
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <SignOutUser />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default AdminHeader