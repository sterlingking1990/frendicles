import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ErrorPage from '../components/ErrorPage';
import HooksToJoin from '../components/HooksToJoin';
import HookPlacesJoined from '../components/HookPlacesJoined';
import HookPlacesToJoin from '../components/HookPlacesToJoin';
const UserRouter = () => (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/hooks" component={HooksToJoin} />
                <Route exact path="/hook-places/:id" component={HookPlacesToJoin} />
                <Route exact path="/hook-places-joined" component={HookPlacesJoined}  />
                <Route exact component={ErrorPage} />
            </Switch>
)

export default UserRouter

