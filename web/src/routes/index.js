import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardAdm from '../pages/Admin/DashboardAdm';
import DashboardClient from '../pages/Client/Dashboard';
import Profile from '../pages/Admin/Profile';
import ProfileClient from '../pages/Client/Profile ';
import OrdersClient from '../pages/Client/Orders';
import OrderCreate from '../pages/Client/Orders/Create';
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
      <Route path="/ordersclient" component={OrdersClient} isPrivate />
      <Route path="/ordercreate" component={OrderCreate} isPrivate />
      <Route path="/requests" component={Requests} isPrivate />
      <Route path="/requestsorders" component={RequestsOrders} isPrivate />
      <Route path="/requestsordetal/:id" component={RequestsDetals} isPrivate />
    </Switch>
  );
}
