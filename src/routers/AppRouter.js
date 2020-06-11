import React from 'react';
import {HashRouter,Router} from 'react-router-dom'
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
              
              const marketers_email=[]
              for(let i=0;i<authUser.users.length;i++){
                if(!!authUser.users[i].marketer){
                  marketers_email.push(authUser.users[i].email)
                }
              }
              
                if(authUser.authState){
                    if(authUser.authState.email==='izundukingsleyemeka@gmail.com'){
                        return <Component1 />
                    }
                    else if (marketers_email.includes(authUser.authState.email)) {
                           
                             /* authUser.email === "uche@gmail.com" ||
                           authUser.email === "izunduchiomaij@gmail.com" ||
                           authUser.email === "ofatri4business@gmail.com" ||
                           authUser.email === "kingstan4christ@yahoo.com" ||
                           authUser.email === "jumokemagaret@gmail.com" ||
                           authUser.email ==="ekwulugwogloriaoluchukwu@gmail.com" ||
                           authUser.email ==="onyinyeizundu3@gmail.com" */
                          

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
                  
                  const marketers_email_router = [];
                  for (let i = 0; i < authUser.users.length; i++) {
                    if (!!authUser.users[i].marketer) {
                      marketers_email_router.push(authUser.users[i].email);
                    }
                  }
                    if (authUser.authState) {
                      
                        if (authUser.authState.email === 'izundukingsleyemeka@gmail.com') {
                            return <Component1 />
                        }
                        else if (marketers_email_router.includes(authUser.authState.email)) {
                               /* authUser.email === "uche@gmail.com" ||
                               authUser.email === "izunduchiomaij@gmail.com" ||
                               authUser.email === "ofatri4business@gmail.com" ||
                               authUser.email === "kingstan4christ@yahoo.com" ||
                               authUser.email === "jumokemagaret@gmail.com" ||
                               authUser.email ==="ekwulugwogloriaoluchukwu@gmail.com" ||
                               authUser.email === "onyinyeizundu3@gmail.com" */

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


const AppRouter = () => (
  <Router history={history}>
    <HashRouter basename="/">
      <div>
        <HeaderHOC />
        <RouterHOC />
      </div>
    </HashRouter>
  </Router>
);

export default withAuthentication(AppRouter);