import React from 'react';
import { connect } from 'react-redux';

import './error-indicator.css';
import icon from './error-icon.png'

const ErrorIndicator = (props) => {
  const { error } = props;
  return (
    <div className="error-indicator mx-auto">
      <img src={icon} alt="error-icon"/>
      <h3>We catch Error here. {error}</h3>
    </div>
  );
}

const mapStateToProps = ({ error }) => {
  return {
    error: error.message
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorIndicator);