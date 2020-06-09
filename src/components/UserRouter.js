import React from 'react';
import {Switch,Route } from 'react-router-dom';
import LoadableDashboard from './LoadableDashboard';
import ErrorPage from './ErrorPage';
import ChangePasswordPage from './ChangePasswordPage';
// import MyTransactionsFB from './MyTransactionsFB';
import SetRewardGoal from './SetRewardGoal';
import CheckMilestone from './CheckMilestone';

import SetNotification from './SetNotification';
import ChangePhone from './ChangePhone';
import PlaceToJoinLazy from './PlaceToJoinLazy';

const UserRouter = () => (
  <Switch>
      <Route exact path="/" component={LoadableDashboard} />
      <Route exact path="/offer" component={PlaceToJoinLazy} />
      {/* <Route exact path="/my-transactions" component={MyTransactionsFB} /> */}
      <Route exact path="/change-password" component={ChangePasswordPage} />
      <Route exact path="/change-phone" component={ChangePhone} />
      <Route exact path="/set-notification" component={SetNotification}/>
      <Route exact path="/set-reward-goal" component={SetRewardGoal} />
      <Route exact path="/check-milestone" component={CheckMilestone} />
      
      <Route exact  component={ErrorPage} />

  </Switch>


);

export default UserRouter

