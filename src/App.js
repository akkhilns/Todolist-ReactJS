import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const Login = React.lazy(() => import('./views/Login'));
const Signup = React.lazy(() => import('./views/Signup'));
const List = React.lazy(() => import('./views/List'));
const Add = React.lazy(() => import('./views/Add'));

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

class App extends Component {
  render() {
  return ( 
<Router>
<React.Suspense fallback={loading()}>
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/list" component={List} />
    <Route path="/add" component={Add} />
  </Switch>
  </React.Suspense>
</Router>
    );
  }
}

export default App;