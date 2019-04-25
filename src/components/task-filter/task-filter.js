import React from 'react';
import { connect } from 'react-redux';
import withBeeJeeService from '../hoc';
import { tasksLoadedAction, tasksLoadErrorAction, changeSortDirectionAction } from '../../actions';

import './task-filter.css';

const TaskFilter = (props) => {
  return (
    <div className='d-flex'>
      <div className="btn-group filter">
        <button
          type="button"
          className="btn btn-outline-secondary text"
          >
          Text
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary email"
          onClick={ () => props.sortField(props.isAsc, "email") }
          >
          Email
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary name"
          onClick={ () => props.sortField(props.isAsc, "username") }
          >
          Name
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary status"
          onClick={ () => props.sortField(props.isAsc, "status") }
          >
          Status
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ filters, isAsc }) => {
  return {
    filters,
    isAsc
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { beeJeeService } = ownProps;

  return {
    sortField: (isAsc, field) => {
      beeJeeService
        .getSortField(isAsc, field)
        .then( (tasks) => dispatch(tasksLoadedAction(tasks)) )
        .then( () => dispatch(changeSortDirectionAction()))
        .catch( (error) => dispatch(tasksLoadErrorAction(error)) )
    }
  }
}

export default withBeeJeeService()(connect(mapStateToProps, mapDispatchToProps)(TaskFilter));