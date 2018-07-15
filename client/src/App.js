import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import ItemsIndex from './pages/Items/ItemsIndex';
import Terms from './pages/Terms';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/terms" component={Terms} />
            <Route path="/items" component={ItemsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
