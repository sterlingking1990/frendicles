import React from 'react'
import {NavLink} from 'react-router-dom'
import SignOutUser from './SignOutUser'
const AdminHeader = () => (
    <div id="header">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className="container mt-3">
                <button className="navbar-toggler" data-target="#Navmenu" data-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a href="/" className="navbar-brand"><span className="navbar-logo">friendicle</span></a>

                <div className="collapse navbar-collapse" id="Navmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <NavLink to="/hooks-page" className="nav-link">Hooks Page </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/places-page" className="nav-link">Places Page </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/create-hook" className="nav-link">Create Hook</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/create-place" className="nav-link">Create Place</NavLink>
                        </li>
                        <li className="nav-item">
                            <SignOutUser/>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    </div>
)

export default AdminHeader