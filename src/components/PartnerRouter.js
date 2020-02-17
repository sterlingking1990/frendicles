import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from '../components/ErrorPage';
import PlacesToJoinFB from './PlacesToJoinFB';
import AcceptTransactionFB from './AcceptTransactionFB';
import SetRewardLimitFB from './SetRewardLimitFB';
import ChangePasswordPage from './ChangePasswordPage';
import createPlaceFB from './createPlaceFB';
import SetRewardTypeFB from './SetRewardTypeFB';
import MyTransactionsFB from './MyTransactionsFB';
import OfatriBalanceFB from './OfatriBalanceFB';
import VerifyTransaction from './VerifyTransaction';
import AdminSetupGoal from './AdminSetupGoal';
import ConfirmFunCodeFB from './ConfirmFunCodeFB';

const UserRouter = () => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/create-offer" component={createPlaceFB} />
        <Route exact path="/offer" component={PlacesToJoinFB} />
        <Route exact path="/my-transactions" component={MyTransactionsFB} />
        <Route exact path="/offer-reward" component={AcceptTransactionFB} />
        <Route exact path="/close-reward" component={ConfirmFunCodeFB} />
        <Route exact path="/verify-payment" component={VerifyTransaction} />
        <Route exact path="/admin-setup-goal" component={AdminSetupGoal} />
        <Route exact path="/set-reward-limit" component={SetRewardLimitFB} />
        <Route exact path="/set-reward-type" component={SetRewardTypeFB} />
        <Route exact path="/ofatri-balance" component={OfatriBalanceFB} />
        <Route exact path="/change-password" component={ChangePasswordPage} />
        <Route exact component={ErrorPage} />
    </Switch>
)

export default UserRouter

