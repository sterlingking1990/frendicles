import React from 'react'
import { NavLink } from 'react-router-dom'
const UserHeader = () => (
    <div id="header">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div className="container">
                <button className="navbar-toggler" data-toggle="collapse" data-target="#NavbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="/" className="navbar-brand"><span className="navbar-logo">friendicle</span></a>
                <div className="collapse navbar-collapse" id="NavbarMenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><NavLink className="nav-link" to="/hooks" activeClassName="is-active" exact={true}>Hooks</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/hook-places-joined" activeClassName="is-active" exact={true}>Joined Hooks</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
)

export default UserHeader