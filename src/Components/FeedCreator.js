import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import FaCamera from 'react-icons/lib/fa/camera';

import PostContainer from './PostContainer';
import VideoPreview from './VideoPreview';
import Button from './Button';

class FeedCreator extends Component {
  static propTypes = {
    facebook: PropTypes.object.isRequired,
  };

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      file: null,
    };
  }

  handleChangeText = ({ target }) => this.setState({ text: target.value });

  handleSelectVideo = () => this.fileInput.click();

  handlePublish = () => {
    console.log('published');
  }

  handleAddVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ file });
    }
  }

  render() {
    const { text } = this.state;
    const { userData } = this.props.facebook;
    const avatar = userData.picture.data.url;
    const rows = (text.match(/\n/g)||[]).length + 1;

    return (
      <PostContainer
        avatar={avatar}
      >
        <Row>
          <textarea
            className="feed-creator-textarea"
            name="enter-message"
            placeholder="Write something..."
            rows={rows}
            value={this.state.text}
            onChange={this.handleChangeText}
          />
        </Row>
        <VideoPreview
          file={this.state.file}
        />
        <Row
          between="xs"
          middle="xs"
        >
          <Col>
            <input
              className="feed-creator-file-input"
              type="file"
              accept="video/*"
              ref={c => { this.fileInput = c; }}
              onChange={this.handleAddVideo}
            />
            <FaCamera
              className="icon-button"
              onClick={this.handleSelectVideo}
            />
          </Col>
          <Col>
            <Button
              label="Publish"
              onClick={this.handlePublish}
            />
          </Col>
        </Row>
      </PostContainer>
    );
  }
}

const mapStateToProps = ({ facebook }) => ({ facebook });

export default connect(mapStateToProps)(FeedCreator);
