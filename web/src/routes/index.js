import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardAdm from '../pages/DashboardAdm';
import Profile from '../pages/Profile';
import Products from '../pages/Products';
import Requests from '../pages/Requests';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboardadmin" component={DashboardAdm} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/products" component={Products} isPrivate />
      <Route path="/requests" component={Requests} isPrivate />
    </Switch>
  );
}
