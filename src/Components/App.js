import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import Posts from './Posts';
import { setUser } from '../redux/facebook';
import '../assets/css/App.css';

class App extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  responseFacebook = (response) => {
    const { accessToken } = response;
    if (accessToken) {
      this.props.setUser(response);
      this.setState({ loggedIn: true });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div
          className="facebook-login-button"
        >
          <FacebookLogin
            appId="246398499191886"
            autoLoad
            fields="name,email,picture"
            scope="user_managed_groups,publish_actions"
            callback={this.responseFacebook}
            icon="fa-facebook"
          />
        </div>
      );
    }

    return (
      <Posts />
    );
  }
}

export default connect(null, {
  setUser,
})(App);
