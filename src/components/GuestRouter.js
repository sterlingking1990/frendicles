import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ErrorPage from '../components/ErrorPage';
import SignUpPage from '../components/SignUpPage';
import SignInPage from '../components/SignInPage';
import ForgetPasswordPage from '../components/ForgetPasswordPage';
const GuestRouter = () => (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/signin" component={SignInPage} />
                <Route exact path="/recover-password" component={ForgetPasswordPage}/>
                <Route exact component={ErrorPage} />
            </Switch>
)

export default GuestRouter