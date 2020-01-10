import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from '../components/ErrorPage';
import PlacesToJoinFB from './PlacesToJoinFB';
import AcceptTransactionFB from './AcceptTransactionFB';
import SetFunLimitFB from './SetFunLimitFB';
import FunSlotsFB from './FunSlotsFB';
import ChangePasswordPage from './ChangePasswordPage';
import createPlaceFB from './createPlaceFB';
import SetFunTypeFB from './SetFunTypeFB';
import MyTransactionsFB from './MyTransactionsFB';

const UserRouter = () => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/create-place" component={createPlaceFB} />
        <Route exact path="/places" component={PlacesToJoinFB} />
        <Route exact path="/my-transactions" component={MyTransactionsFB} />
        <Route exact path="/accept-transaction" component={AcceptTransactionFB} />
        <Route exact path="/set-fun-limit" component={SetFunLimitFB} />
        <Route exact path="/set-fun-type" component={SetFunTypeFB} />
        <Route exact path="/fun-slots" component={FunSlotsFB} />
        <Route exact path="/change-password" component={ChangePasswordPage} />
        <Route exact component={ErrorPage} />
    </Switch>
)

export default UserRouter

