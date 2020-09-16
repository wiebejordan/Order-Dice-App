import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Setup from './Components/Setup/Setup';
import Landing from './Components/Landing/Landing';

export default (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route path='/setup' component={Setup}/>
  </Switch>
);

