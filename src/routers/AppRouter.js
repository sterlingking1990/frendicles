import React from 'react';
import { Router} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import GuestHeader from '../components/GuestHeader';
import UserHeader from '../components/UserHeader'
import AdminHeader from '../components/AdminHeader';

import AdminRouter from '../components/AdminRouter';
import UserRouter from '../components/UserRouter';
import GuestRouter from '../components/GuestRouter';
import {withAuthentication} from '../session';
import {AuthUserContext} from '../session'


export const history=createHistory();

const HOCHeader = (Component1, Component2, Component3) => {
    return () => (
        <div>
            <AuthUserContext.Consumer>
            {authUser=>authUser ? authUser.email === 'izundukingsleyemeka@gmail.com' ? <Component1 /> : <Component2 /> : <Component3 />}
            </AuthUserContext.Consumer>
        </div>
    )

}

const HOCRouter = (Component1, Component2, Component3) => {
    return () => (
        <div>
            <AuthUserContext.Consumer>
            {authUser=>authUser ? authUser.email === 'izundukingsleyemeka@gmail.com' ? <Component1 /> : <Component2 /> : <Component3 />}
            </AuthUserContext.Consumer>
        </div>
    )

}

const HeaderHOC = HOCHeader(AdminHeader, UserHeader, GuestHeader)
const RouterHOC=HOCRouter(AdminRouter,UserRouter,GuestRouter);


const AppRouter=()=>(
            <Router history={history}>
                <div>
                <HeaderHOC/>
                <RouterHOC/>
                </div>
            </Router>
        )

export default withAuthentication(AppRouter);