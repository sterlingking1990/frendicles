import React from 'react'
import { NavLink } from 'react-router-dom'
const GuestHeader = () => (
    <header>
        <h1>friendicle</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    </header>
)

export default GuestHeader