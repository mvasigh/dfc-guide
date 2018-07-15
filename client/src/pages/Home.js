import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

import ItemCard from '../components/ItemCard';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import BasicCard from '../components/BasicCard';

class Home extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  renderGetStarted() {
    const getStartedLinks = [
      {
        title: 'Browse Community Resources',
        description:
          "Search our categorized database of community resources for your patients' unmet needs",
        to: '/items'
      },
      {
        title: 'Access our Guide Book',
        description:
          'Read helpful information about screening for unmet needs, insurance options, eligibility, and more.',
        to: '/guides'
      },
      {
        title: 'How to Use the DFC Guide',
        description:
          'Learn how you can most effectively use the Guide to find what you are looking for.',
        to: '/guides/5b2325d6150ba65740e504a1'
      }
    ];

    return getStartedLinks.map((link, i) => (
      <div key={i} className="column is-one-third">
        <Link to={link.to}>
          <BasicCard title={link.title} description={link.description} />
        </Link>
      </div>
    ));
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
      <div className="dfc-page-container">
        <section className="hero is-link is-bold is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="dfc-hero-logo">
                <img alt="Doctors for Change" src={logo} />
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
            <div className="columns is-multiline">
              {this.renderGetStarted()}
            </div>
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
