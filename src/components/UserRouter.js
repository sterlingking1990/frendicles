import React from 'react';
import {Switch,Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import PlacesToJoinFB from './PlacesToJoinFB';
import ChangePasswordPage from './ChangePasswordPage';
// import MyTransactionsFB from './MyTransactionsFB';
import SetRewardGoal from './SetRewardGoal';
import CheckMilestone from './CheckMilestone';

import SetNotification from './SetNotification';
import ChangePhone from './ChangePhone';

const UserRouter = () => (
  <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/offer" component={PlacesToJoinFB} />
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

