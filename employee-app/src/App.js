import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home'
import {Department} from './components/Department/Department'
import {Employee} from './components/Employee/Employee'
import Login from './components/Login/Login'
import { PrivateRoute } from './components/Utils/PrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { history } from './helpers/history';


class App extends Component {

  constructor(props) {
    super(props);
  }


  render(){
      return (
        
      <div className="container">
        <Router history={history}>  
          <Switch>
            <PrivateRoute exact path="/home" component={Home}  ></PrivateRoute>
            <PrivateRoute exact path="/department" component={Department} ></PrivateRoute>
            <PrivateRoute exact path="/employee" component={Employee} ></PrivateRoute>
            <Route path="/login" component={Login} ></Route>
            <Route path="/" component={Login} ></Route>
          </Switch>
        </Router>
      </div>
     

      );
    }
}

export default App;
