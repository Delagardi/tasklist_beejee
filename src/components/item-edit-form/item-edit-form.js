import React, { Component } from 'react';
import { connect } from 'react-redux';
import withBeeJeeService from '../hoc';
import {
  isEditingAction,
  setEditableTaskAction,
  tasksLoadErrorAction
 } from '../actions';

import './item-edit-form.css';

const ItemEditForm = ({ 
  onSubmitForm, 
  onLabelChange, 
  onStatusToggle, 
  statusClassName, 
  onCreateTask, 
  text
}) => {
  return (
    <form 
      className="item-add-form d-flex"
      onSubmit={onSubmitForm}>
      <input 
        type="text" 
        className="form-control text-edit"
        onChange={onLabelChange}
        name="text"
        value={text}/>
      <button 
        type="button"
        className="btn btn-outline-success btn-sm float-right status-edit"
        onClick={onStatusToggle}>
        <i className={statusClassName} />
      </button>
      <button 
        className="btn btn-outline-primary btn-add"
        onClick={onCreateTask}>
        Edit
      </button>
    </form>
  );
}

class ItemEditFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      text: "",
      status: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.text) {
      return {
        id: nextProps.editableTask.id,
        text: nextProps.editableTask.text,
        status: nextProps.editableTask.status,
      }
    }

    return null;
  }

  onLabelChange = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  onStatusToggle = () => {
    switch (this.state.status) {
      case 0:
        this.setState({
          status: 10
        })
        break;
      
      case 10:
        this.setState({
          status: 0
        })
        break;
    
      default:
        this.setState({
          status: 0
        })
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    const newData = {
      id: this.state.id,
      text: this.state.text,
      status: this.state.status
    }

    this.props.onEditTask(newData);

    this.setState({
      id: 0,
      text: "",
      status: null
    });
  }

  render() {
    const { status } = this.state;
    const statusClassName = status ? "fa fa-check-square-o fa-lg" : "fa fa-square-o fa-lg";

    return (
      <ItemEditForm
        onSubmitForm={this.onSubmitForm}
        onLabelChange={this.onLabelChange} 
        onStatusToggle={this.onStatusToggle}
        statusClassName={statusClassName}
        onCreateTask={this.props.onCreateTask}
        text={this.state.text}
      />
    );
  }
}

const mapStateToProps = ({ isEdit, editableTask }) => {
  return {
    isEdit,
    editableTask
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { beeJeeService } = ownProps;

  return {
    onEditTask: (newData) => 
      beeJeeService
        .updateTask(newData)
        .then( () => dispatch(isEditingAction()) )
        .then( () => dispatch(setEditableTaskAction()) )
        .catch( (error) => dispatch(tasksLoadErrorAction(error)) )
  }
}

export default withBeeJeeService()(connect(mapStateToProps, mapDispatchToProps)(ItemEditFormContainer));