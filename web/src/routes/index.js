import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardAdm from '../pages/Admin/DashboardAdm';
import DashboardClient from '../pages/Client/Dashboard';
import Profile from '../pages/Admin/Profile';
import ProfileClient from '../pages/Client/Profile ';
import ProductsClient from '../pages/Client/Products';
import ProductCreate from '../pages/Client/Products/Create';
// import Requests from '../pages/Admin/DashboardAdm/Requests';
// import RequestsOrders from '../pages/Admin/DashboardAdm/Requests/Orders';
// import RequestsDetals from '../pages/Admin/DashboardAdm/Requests/Detals';
import Requests from '../pages/Admin/Requests';
import RequestsOrders from '../pages/Admin/Requests/Orders';
import RequestsDetals from '../pages/Admin/Requests/Detals';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboardadmin" component={DashboardAdm} isPrivate />
      <Route path="/dashboardclient" component={DashboardClient} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/profileclient" component={ProfileClient} isPrivate />
      <Route path="/productsclient" component={ProductsClient} isPrivate />
      <Route path="/productcreate" component={ProductCreate} isPrivate />
      <Route path="/requests" component={Requests} isPrivate />
      <Route path="/requestsorders" component={RequestsOrders} isPrivate />
      <Route path="/requestsordetal/:id" component={RequestsDetals} isPrivate />
    </Switch>
  );
}
