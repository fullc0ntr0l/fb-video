import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Loader from 'halogen/PulseLoader';
import { Row, Col } from 'react-flexbox-grid';

import Post from './Post';

class Feed extends Component {
  static propTypes = {
    facebook: PropTypes.object.isRequired,
  };

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { facebook } = this.props;
    const { fetchingFeed, feed } = facebook;

    if (fetchingFeed) {
      return (
        <Loader color="#365899" size="16px" margin="4px" />
      );
    }

    return (
      <Row>
        <Col xs>
          {feed.map((post) => (
            <Post
              key={post.id}
              data={post}
            />
          ))}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ facebook }) => ({ facebook });

export default connect(mapStateToProps)(Feed);
