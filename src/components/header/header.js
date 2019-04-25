import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedInFalseAction } from '../../actions';

import './header.css';

class Header extends Component {
  onSubmit = (event) => {
    event.preventDefault();

    this.props.isLoggedInFalse();
  }

  render () {
    const { isLoggedIn } = this.props;
    const MESSAGE_ADMIN = 'Hi, admin!';
    const MESSAGE_USER = 'You need to log in';

    const statusMessage = isLoggedIn ? <span>{MESSAGE_ADMIN}</span> : <span>{MESSAGE_USER}</span>;

    const LOGOUT_BUTTON = 
    <form className="logout">
      <button className="btn btn-outline-primary login-btn" type="submit">Log out</button>
    </form>

    const LOGIN_BUTTON = <Link to="/login" className="justify-content-end btn btn-outline-primary login-btn">Login</Link>

    const status = isLoggedIn ? LOGOUT_BUTTON : LOGIN_BUTTON;
    
    return (
      <div className="app-header">
        <div className="login-block">
          {statusMessage}
          {status}
        </div>
        <Link to="/" className="main-header">TASKLIST for BeeJee</Link>
      </div>
      );
  }
}

const mapStateToProps = ({ isLoggedIn }) => {
  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedInFalse: () => dispatch(isLoggedInFalseAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);