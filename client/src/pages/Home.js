import React, { Component } from 'react';
import logo from '../logo.svg';
import { ItemsList } from '../components/ItemsList';
import ItemCard from '../components/ItemCard';

export class Home extends Component {
  render() {
    return (
      <div>
        <section className="hero is-link is-bold is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="dfc-hero-logo">
                <img src={logo} />
              </div>
              <h1 className="title">DFC Guide</h1>
              <h2 className="subtitle">
                Find community resources in the Houston area to meet your
                patients' needs
              </h2>
              <div className="columns is-centered">
                <div className="column is-half is-narrow">
                  <form action="/items" method="GET">
                    <div className="field">
                      <div className="control has-icons-left">
                        <input
                          type="text"
                          className="input is-medium is-rounded"
                          placeholder="Search the Guide..."
                          name="search"
                        />
                        <span className="icon is-left is-medium">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ItemCard
          id={1}
          title="Hello World"
          description="Wow this is truly a wonderful React component"
          category="test"
          tags={['hello', 'world']}
        />
      </div>
    );
  }
}

export default Home;
