import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import { connect } from 'react-redux';
import { tasksLoadErrorAction } from '../actions';

class ErrorBoundry extends Component {
  componentDidCatch(error) {
    const { errorCatched } = this.props;

    errorCatched(error);
  }

  render() {
    if (this.props.error) {
      return <ErrorIndicator/>
    }

    return this.props.children;
  }
}

const mapStateToProps = ({ error }) => {
  return {
    error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    errorCatched: (error) => dispatch(tasksLoadErrorAction(error))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);