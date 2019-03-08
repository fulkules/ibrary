import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Task from './components/Task/Task';
import Goal from './components/Goal/Goal';
import Vision from './components/Vision/Vision';
import Excite from './components/Excite/Excite';

export default (
    <Switch>
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/task' component={ Task } />
        <Route path='/goal' component={ Goal } />
        <Route exact path='/excite' component={ Excite } />
        <Route exact path='/vision' component={ Vision } />
        <Route exact path='/' component={ Login } />
    </Switch>
)