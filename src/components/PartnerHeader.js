import React from 'react'
import { NavLink } from 'react-router-dom'
import { withFirebase } from '../firebase'
import SignOutUser from './SignOutUser'
const UserHeader = () => (
    <div id="header">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div className="container">
                <button className="navbar-toggler" data-toggle="collapse" data-target="#NavbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="/" className="navbar-brand"><span className="navbar-logo">ofatri</span></a>
                <div className="collapse navbar-collapse" id="NavbarMenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><NavLink className="nav-link" to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
                        <li className="nav-item">
                            <NavLink to="/create-place" className="nav-link">Create Offer</NavLink>
                        </li>
                        <li className="nav-item"><NavLink className="nav-link" to="/places" activeClassName="is-active" exact={true}>Join Offer</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/my-transactions" activeClassName="is-active" exact={true}>My Rewards</NavLink></li>

                        <li className="dropdown" id="menu-anchor">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Reward Customer
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><NavLink className="nav-link" to="/accept-transaction" activeClassName="is-active" exact={true}>Accept Tranzact</NavLink></li>
                            </ul>
                        </li>

                        <li className="dropdown" id="menu-anchor">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Reward Settings
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><NavLink className="nav-link" to="/set-fun-limit" activeClassName="is-active" exact={true}>Set Fun Limit</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/set-fun-type" activeClassName="is-active" exact={true}>Set Fun Type</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/fun-slots" activeClassName="is-active" exact={true}>Fun Slots</NavLink></li>
                            </ul>
                        </li>

                        <li className="dropdown" id="menu-anchor">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Account
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="nav-link" to="/change-password" activeClassName="is-active" exact={true}>Change Password</NavLink></li>
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
)

export default withFirebase(UserHeader)