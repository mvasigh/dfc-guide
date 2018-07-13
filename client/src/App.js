import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/terms" component={Terms} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
