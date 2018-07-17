import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import ItemsIndex from './pages/Items/ItemsIndex';
import ItemsShow from './pages/Items/ItemsShow';
import Guides from './pages/Guides';
import Terms from './pages/Terms';
import Footer from './components/Footer';

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
            <Route
              path="/items/:itemId"
              render={props => (
                <ItemsShow key={props.match.params.itemId} {...props} />
              )}
            />
            <Route path="/items" component={ItemsIndex} />
            <Route path="/guides/:guideId" component={Guides} />
            <Route exact path="/guides" component={Guides} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
