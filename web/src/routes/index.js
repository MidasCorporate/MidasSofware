import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardAdm from '../pages/DashboardAdm';
import Profile from '../pages/Profile';
import Products from '../pages/Products';
import ProductCreate from '../pages/Products/Create';
import Requests from '../pages/Requests';
import RequestsOrders from '../pages/Requests/Orders';
import RequestsDetals from '../pages/Requests/Detals';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboardadmin" component={DashboardAdm} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/products" component={Products} isPrivate />
      <Route path="/productcreate" component={ProductCreate} isPrivate />
      <Route path="/requests" component={Requests} isPrivate />
      <Route path="/requestsorders" component={RequestsOrders} isPrivate />
      <Route path="/requestsordetal/:id" component={RequestsDetals} isPrivate />
    </Switch>
  );
}
