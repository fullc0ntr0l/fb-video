import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import PostContainer from './PostContainer';
import VideoPlayer from './VideoPlayer';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { message, from, updated_time, type, source, id } = this.props.data;
    const { name } = from;
    const avatar = from.picture.data.url;

    let content;

    switch (type) {
      case 'video':
        content = (
          <VideoPlayer
            src={source}
            id={id}
          />
        );
        break;
      default:
        content = null;
        break;
    }

    return (
      <PostContainer
        avatar={avatar}
        name={name}
        updated={updated_time}
      >
        <Row>
          <Col xs className="post-content">
            {message &&
              <Row>
                {message}
              </Row>
            }
            {
              content &&
              <Row>
                {content}
              </Row>
            }
          </Col>
        </Row>
      </PostContainer>
    );
  }
}

export default Post;
