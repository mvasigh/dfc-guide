import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/terms" component={Terms} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
