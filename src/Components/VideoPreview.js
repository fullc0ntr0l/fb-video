import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'halogen/PulseLoader';
import { Row, Col } from 'react-flexbox-grid';

import ThumbnailPreview from './ThumbnailPreview';

import {
  generateImgArray,
  generateTimeArray
} from '../utils';

class VideoPreview extends Component {
  static propTypes = {
    file: PropTypes.object,
    thumbnailsCount: PropTypes.number,
  };

  static defaultProps = {
    file: null,
    thumbnailsCount: 10,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      thumbnailsArray: [],
      thumbnailIndex: 0,
      loadingThumbnails: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.file !== nextProps.file) {
      this.setState({ loadingThumbnails: true }, () => {
        this.getVideoMetadata(nextProps.file);
      });
    }
  }

  getVideoMetadata(file) {
    const mime = file.type;
    const reader = new FileReader();

    reader.onload = (e) => {
      const blob = new Blob([e.target.result], { type: mime });
      const url = URL.createObjectURL(blob);
      const video = document.createElement('video');

      video.preload = "metadata";
      video.addEventListener("loadedmetadata", () => {

        // File metadata
        console.log(file);
        console.log(video.duration);

        const timeArray = generateTimeArray(video.duration, this.props.thumbnailsCount);

        generateImgArray(video.src, timeArray).then(thumbnailsArray => {
          this.setState({ thumbnailsArray, thumbnailIndex: 0, loadingThumbnails: false });
        })
      });

      video.src = url;
    }

    reader.readAsArrayBuffer(file);
  }

  selectThumbnail = (index = 0) => this.setState({ thumbnailIndex: index });

  handleChangeTitle = ({ target }) => this.setState({ title: target.value });

  handleChangeTags = ({ target }) => this.setState({ tags: target.value });

  handleNextThumbnail = () => {
    const { thumbnailIndex, thumbnailsArray } = this.state;
    const thumbnailsCount = thumbnailsArray.length;
    const nextIndex = thumbnailIndex + 1 < thumbnailsCount ? thumbnailIndex + 1 : 0;

    this.selectThumbnail(nextIndex);
  }

  handlePreviousThumbnail = () => {
    const { thumbnailIndex, thumbnailsArray } = this.state;
    const thumbnailsCount = thumbnailsArray.length;
    const nextIndex = thumbnailIndex - 1 < 0 ? thumbnailsCount - 1 : thumbnailIndex - 1;

    this.selectThumbnail(nextIndex);
  }

  handleAddCustomThumbnail = (src) => {
    const { thumbnailsArray } = this.state;
    thumbnailsArray.push(src);

    const thumbnailIndex = thumbnailsArray.length - 1;

    this.setState({ thumbnailsArray, thumbnailIndex });
  }

  render() {
    if (!this.props.file) return null;

    return (
      <Row className="video-preview-container">
        <Col xs>
          <Row>
            <Col xs={6} className="video-preview-input">
              <label>Title</label>
              <input
                placeholder="Write a title"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
            </Col>
            <Col xs={6} className="video-preview-input">
              <label>Tags</label>
              <input
                placeholder="Add tags (ex: comedy, animals etc.)"
                value={this.state.tags}
                onChange={this.handleChangeTags}
              />
            </Col>
          </Row>
          {this.state.loadingThumbnails ?
            <Row center="xs">
              <Loader color="#365899" size="16px" margin="4px" />
            </Row> :
            <Row>
              <Col xs>
                <ThumbnailPreview
                  src={this.state.thumbnailsArray[this.state.thumbnailIndex]}
                  onNext={this.handleNextThumbnail}
                  onPrevious={this.handlePreviousThumbnail}
                  onAddCustomThumbnail={this.handleAddCustomThumbnail}
                />
                <Row className="video-preview-thumbnail-count">
                  <Col xs>
                    {`${this.state.thumbnailIndex + 1}/${this.state.thumbnailsArray.length}`}
                  </Col>
                </Row>
              </Col>
            </Row>
          }
        </Col>
      </Row>
    );
  }
}

export default VideoPreview;
