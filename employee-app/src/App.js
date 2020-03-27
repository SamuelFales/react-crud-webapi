import React from 'react';
import './App.css';

import {Home} from './components/Home/Home'
import {Department} from './components/Department/Department'
import {Employee} from './components/Employee/Employee'
import {Login} from './components/Login/Login'
import { PrivateRoute } from './components/Utils/PrivateRoute';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>    
    <div className="container">

      <Switch>
        <PrivateRoute exact path="/home" component={Home}  ></PrivateRoute>
        <PrivateRoute exact path="/department" component={Department} ></PrivateRoute>
        <PrivateRoute exact path="/employee" component={Employee} ></PrivateRoute>
        <Route path="/login" component={Login} ></Route>
      </Switch>

    </div>
    </BrowserRouter>

  );
}

export default App;
