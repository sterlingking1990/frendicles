import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import PlacesToJoinFB from './PlacesToJoinFB';
import ChangePasswordPage from './ChangePasswordPage';
import MyTransactionsFB from './MyTransactionsFB';
const UserRouter = () => (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/places" component={PlacesToJoinFB} />
                <Route exact path="/my-transactions" component={MyTransactionsFB} />
                <Route exact path="/change-password" component={ChangePasswordPage} />
                <Route exact component={ErrorPage} />
            </Switch>
)

export default UserRouter

