import React, { Component } from 'react';
import { connect } from 'react-redux';
import withBeeJeeService from '../hoc';
import { tasksRequestedAction, tasksLoadedAction, tasksLoadErrorAction, setEditableTaskAction } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator/';
import TaskListItem from '../task-list-item';

import './task-list.css';

class TaskList extends Component {
  componentDidMount() {
    this.updateList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.updateList();
    }

    if (this.props.isEdit !== prevProps.isEdit) {
      this.updateList();
    }

    if (this.props.editableID !== prevProps.editableID) {
      const editableTask = this.props.tasks.find( (task) => task.id === this.props.editableID );

      this.props.setEditableTask(editableTask);
    }
  }

  updateList() {
    const { 
      currentPage, 
      fetchTasks,
      tasksRequested,
     } = this.props;
    
    tasksRequested();
    fetchTasks(currentPage);
  }

  render() {
    const { tasks, loading, error } = this.props;

    const elements = tasks.map((task) => {
      return ( 
        <TaskListItem
          key={task.id}
          {...task}
        />
      );
    });
    
    const content = loading ? <Spinner/> : elements;

    if (error) {
      return <ErrorIndicator/>
    }

    return (
      <ul className='list-group todo-list'>
        { content }
      </ul>
    )
  }
}

const mapStateToProps = ({ tasks, loading, error, currentPage, editableID, isEdit }) => {
  return ({
    tasks,
    loading,
    error,
    currentPage,
    editableID,
    isEdit
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { beeJeeService } = ownProps;

  return {
    tasksRequested: () => dispatch(tasksRequestedAction()),
    fetchTasks: (page) => {
      
      beeJeeService
        .getTasks(page)
        .then( (tasks) => dispatch(tasksLoadedAction(tasks)) )
        .catch( (error) => dispatch(tasksLoadErrorAction(error)) )  
    },
    setEditableTask: (editableTask) => dispatch(setEditableTaskAction(editableTask))
  }
}

export default withBeeJeeService()(connect(mapStateToProps, mapDispatchToProps)(TaskList));