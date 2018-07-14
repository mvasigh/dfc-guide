import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

import ItemCard from '../components/ItemCard';
import logo from '../logo.svg';

class Home extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  renderMostViewed() {
    if (this.props.items != {}) {
      const items = _.sortBy(this.props.items, 'views').slice(0, 6);
      return _.map(items, (item, i) => (
        <div key={i} className="column is-one-third">
          <ItemCard
            title={item.title}
            description={item.description}
            category={item.category.name}
            id={item._id}
            tags={item.tags}
          />
        </div>
      ));
    }
  }

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
        <section className="section">
          <div className="container">
            <p className="title is-4">Getting Started</p>
            <p className="title is-4">Most Viewed</p>
            <p className="subtitle has-text-grey is-6">
              View our most frequently accessed resources.
            </p>
            <div className="columns is-multiline">
              {this.renderMostViewed()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(
  mapStateToProps,
  { fetchItems }
)(Home);
