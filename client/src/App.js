import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemsIndex from './pages/Items/ItemsIndex';
import ItemsShow from './pages/Items/ItemsShow';
import Guides from './pages/Guides';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home key={props.location.href} {...props} />}
            />
            <Route
              path="/items/:itemId"
              render={props => (
                <ItemsShow key={props.match.params.itemId} {...props} />
              )}
            />
            <Route
              exact
              path="/items"
              render={props => (
                <ItemsIndex key={props.location.search} {...props} />
              )}
            />
            <Route path="/guides/:guideId" component={Guides} />
            <Route exact path="/guides" component={Guides} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
