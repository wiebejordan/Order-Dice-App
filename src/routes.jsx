import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Setup from './Components/Setup/Setup';
import SetupClass from './Components/Setup/SetupClass'
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';

export default (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route path='/setup' component={Setup}/>
    {/* <Route path='/game' component={Dashboard}/> */}
  </Switch>
);

