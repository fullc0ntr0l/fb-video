import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Feed from './Feed';
import FeedCreator from './FeedCreator'
import { getFeed } from '../redux/facebook';

import '../assets/css/Posts.css';

class Posts extends Component {
  static propTypes = {
    getFeed: PropTypes.func.isRequired,
    facebook: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { facebook } = this.props;
    const { userData } = facebook;
    this.props.getFeed(userData.id);
  }

  render() {
    return (
      <Grid className="feed-container">
        <Row center="xs">
          <Col xs className="posts-line">
            <FeedCreator />
            <Feed />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({ facebook }) => ({ facebook });

export default connect(mapStateToProps, {
  getFeed,
})(Posts);
