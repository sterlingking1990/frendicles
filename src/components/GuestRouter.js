import React from 'react';
import { Switch, Route } from 'react-router-dom';
import JoinPage from '../components/JoinPage';
import LandingPage from '../components/LandingPage';
import ErrorPage from '../components/ErrorPage';
const GuestRouter = () => (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/join/:id" component={JoinPage} />
                <Route exact component={ErrorPage} />
            </Switch>
)

export default GuestRouter