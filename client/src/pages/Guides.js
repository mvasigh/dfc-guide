import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchGuides, fetchTopics } from '../actions';

import { Link } from 'react-router-dom';

class Guides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guideId: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchGuides();
    this.props.fetchTopics();

    if (this.props.match.params.guideId) {
      this.setState({ guideId: this.props.match.params.guideId });
    } else {
      this.setState({ guideId: '' });
    }
  }

  handleMenuClick(guideId) {
    this.setState({ guideId });
  }

  renderTopicGuides(topic) {
    return topic.guides.map(guide => (
      <li key={guide.id}>
        <Link
          to={`/guides/${guide.id}`}
          onClick={() => this.handleMenuClick(guide.id)}
          className={`${this.state.guideId === guide.id ? 'is-active' : ''}`}
        >
          {guide.title}
        </Link>
      </li>
    ));
  }

  renderTopicMenu() {
    if (!this.props.topics) {
      return;
    }
    const topics = _.sortBy(this.props.topics, 'index');
    const menu = topics.map((topic, i) => (
      <aside key={topic._id} className="menu" style={{ paddingTop: '16px' }}>
        <p className="menu-label">{topic.title}</p>
        <ul className="menu-list">{this.renderTopicGuides(topic)}</ul>
      </aside>
    ));

    return (
      <div>
        <div className="level is-hidden-tablet">
          <button className="button is-light is-fullwidth">
            <span>[ + ] Expand menu options</span>
          </button>
        </div>
        {menu}
      </div>
    );
  }

  renderGuideDetail() {
    const { guideId } = this.state;

    if (!guideId) {
      return <div>Select a Guide from the menu.</div>;
    }

    const guide = this.props.guides[guideId];

    if (!guide) {
      return;
    }

    return (
      <div className="box">
        <p className="title is-4">{guide.title}</p>
        <hr />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="dfc-page-container">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                {this.renderTopicMenu()}
              </div>
              <div className="column is-two-thirds">
                {this.renderGuideDetail()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ guides, topics }) {
  return {
    guides,
    topics
  };
}

export default connect(
  mapStateToProps,
  { fetchGuides, fetchTopics }
)(Guides);
