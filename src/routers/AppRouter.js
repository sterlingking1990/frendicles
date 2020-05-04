import React from 'react';
import { Router} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import GuestHeader from '../components/GuestHeader';
import UserHeader from '../components/UserHeader'
import AdminHeader from '../components/AdminHeader';
import PartnerHeader from '../components/PartnerHeader';

import AdminRouter from '../components/AdminRouter';
import UserRouter from '../components/UserRouter';
import PartnerRouter from '../components/PartnerRouter';
import GuestRouter from '../components/GuestRouter';
import {withAuthentication} from '../session';
import {AuthUserContext} from '../session'


export const history=createHistory();

const HOCHeader = (Component1, Component2, Component3, Component4) => {
    return () => (
        <div>
            <AuthUserContext.Consumer>
            {authUser=>{
                if(authUser){
                    if(authUser.email==='izundukingsleyemeka@gmail.com'){
                        return <Component1 />
                    }
                    else if (
                           authUser.email === "uche@gmail.com" ||
                           authUser.email === "izunduchiomaij@gmail.com" ||
                           authUser.email === "cakelegend@gmail.com" ||
                           authUser.email === "kingstan4christ@yahoo.com" ||
                           authUser.email === "asabe@gmail.com"
                         ) {
                           //partner emails
                           return <Component4 />;
                         } else {
                           return <Component2 />;
                         }
                }
                else{
                    return <Component3 />
                }}}
            </AuthUserContext.Consumer>
        </div>
    )

}

const HOCRouter = (Component1, Component2, Component3, Component4) => {
    return () => (
        <div>
            <AuthUserContext.Consumer>
                {authUser => {
                    if (authUser) {
                        if (authUser.email === 'izundukingsleyemeka@gmail.com') {
                            return <Component1 />
                        }
                        else if (
                               authUser.email === "uche@gmail.com" ||
                               authUser.email === "izunduchiomaij@gmail.com" ||
                               authUser.email === "cakelegend@gmail.com" ||
                               authUser.email === "kingstan4christ@yahoo.com" ||
                               authUser.email === "asabe@gmail.com"
                             ) {
                               //partner emails
                               return <Component4 />;
                             } else {
                               return <Component2 />;
                             }
                    }
                    else {
                        return <Component3 />
                    }
                }}
            </AuthUserContext.Consumer>
        </div>
    )

}

const HeaderHOC = HOCHeader(AdminHeader, UserHeader, GuestHeader,PartnerHeader)
const RouterHOC=HOCRouter(AdminRouter,UserRouter,GuestRouter, PartnerRouter);


const AppRouter=()=>(
            <Router history={history}>
                <div>
                <HeaderHOC/>
                <RouterHOC/>
                </div>
            </Router>
        )

export default withAuthentication(AppRouter);