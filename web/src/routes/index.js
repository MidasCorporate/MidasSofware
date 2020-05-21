import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardAdm from '../pages/Admin/DashboardAdm';
import Profile from '../pages/Admin/Profile';
import Products from '../pages/Admin/Products';
import ProductCreate from '../pages/Admin/Products/Create';
import Requests from '../pages/Admin/Requests';
import RequestsOrders from '../pages/Admin/Requests/Orders';
import RequestsDetals from '../pages/Admin/Requests/Detals';

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
