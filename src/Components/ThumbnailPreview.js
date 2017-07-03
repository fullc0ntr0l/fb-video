import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaCamera from 'react-icons/lib/fa/camera';


class ThumbnailPreview extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    src: PropTypes.string,
    onAddCustomThumbnail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onNext: undefined,
    onPrevious: undefined,
    src: undefined,
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleAddCustomThumbnail = () => this.fileInput.click();

  handleAddThumbnail = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.props.onAddCustomThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <Row className="video-preview-thumbnail-container">
        <Col xs>
          <Row>
            <Col xs>
              <img
                className="video-preview-thumbnail"
                src={this.props.src}
                alt="Thumbnail"
              />
            </Col>
          </Row>
          <Row className="video-preview-buttons">
            <Col
              className="video-preview-arrow arrow-left"
              onClick={this.props.onPrevious}
            >
              <FaAngleLeft
                size={48}
              />
            </Col>
            <Col
              className="video-preview-arrow arrow-right"
              onClick={this.props.onNext}
            >
              <FaAngleRight
                size={48}
              />
            </Col>
            <Col
              className="video-preview-add-thumbnail-button"
              onClick={this.handleAddCustomThumbnail}
            >
              <Row middle="xs">
                <Col>
                  <input
                    className="feed-creator-file-input"
                    type="file"
                    accept="image/*"
                    ref={c => { this.fileInput = c; }}
                    onChange={this.handleAddThumbnail}
                  />
                  <FaCamera className="icon-button" />
                </Col>
                <Col className="video-preview-button-label">
                  Add Custom Thumbnail
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ThumbnailPreview;
