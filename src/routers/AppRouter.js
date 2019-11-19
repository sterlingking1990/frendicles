import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'

import GuestHeader from '../components/GuestHeader';
import UserHeader from '../components/UserHeader'
import AdminHeader from '../components/AdminHeader';

import AdminRouter from '../components/AdminRouter';
import UserRouter from '../components/UserRouter';
import GuestRouter from '../components/GuestRouter';


const HOCHeader = (Component1, Component2, Component3) => {
    return (props) => (
        <Route>
            {props.user === 'admin' && <Component1 />}
            {props.user === 'user' && <Component2 />}
            {props.user === 'guest' && <Component3 />}
        </Route>
    )

}

const HOCRouter = (Component1, Component2, Component3) => {
    return (props) => (
        <Route>
            {props.user === 'admin' && <Component1 />}
            {props.user === 'user' && <Component2 />}
            {props.user === 'guest' && <Component3 />}
        </Route>
    )

}

const Header = HOCHeader(AdminHeader, UserHeader, GuestHeader)
const Router=HOCRouter(AdminRouter,UserRouter,GuestRouter);


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header user="user" />
            <Router user="user"/>
        </div>
    </BrowserRouter>
)

export default AppRouter;