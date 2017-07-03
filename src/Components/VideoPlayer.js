import React, { Component } from 'react';
import PropTypes from 'prop-types'
import videojs from 'video.js';

import '../assets/css/player-fb-skin.css';

class VideoPlayer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {

    };

    this.uniqueId = `post-video-${props.id}`;
  }

  componentDidMount() {
    this.player = videojs(this.uniqueId);
    this.player.on('mouseout', () => {
      this.player.userActive(false);
    });

    this.player.on('mouseover', () => {
      this.player.userActive(true);
    });
  }

  render() {
    return (
      <video
        id={this.uniqueId}
        className="video-js"
        height="100%"
        width="100%"
        preload="auto"
        controls
      >
        <source src={this.props.src} />
      </video>
    );
  }
}

export default VideoPlayer;
