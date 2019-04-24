import React, { Component } from 'react';
import { connect } from 'react-redux';
import withBeeJeeService from '../hoc';
import { taskCreateRequestedAction, taskCreateSuccessAction, taskCreateErrorAction } from '../actions';

import './item-add-form.css';

const ItemAddForm = ({ 
  onSubmitForm,
  onLabelChange,
  labelText,
  labelEmail,
  labelName,
  onCreateTask,
  emailError,
  emailValid
}) => {
  return (
    <form 
      className="item-add-form"
      onSubmit={onSubmitForm}>
      <div className="inputsWrapper d-flex">
        <input 
          type="text" 
          className="form-control text"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          name="labelText"
          value={labelText}/>
        <input 
          type="text" 
          className="form-control email"
          placeholder="Your Email"
          onChange={onLabelChange}
          name="labelEmail"
          value={labelEmail}/>
        <input 
          type="text" 
          className="form-control name"
          placeholder="Your name"
          onChange={onLabelChange}
          name="labelName"
          value={labelName}/>
        <button 
          className="item-add-btn btn btn-outline-primary btn-add"
          onClick={onCreateTask}
          disabled={!emailValid}>
          Add
        </button>
      </div>
        <small 
          className={emailValid ? "hidden" : "text-danger text-center d-block" }>
            {emailError}
        </small>
    </form>
  );
}

class ItemAddFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      labelText: '',
      labelEmail: '',
      labelName: '',
      emailValid: false,
      emailError: ''
    }
  }

  onLabelChange = ({target: {name, value}}) => {
    this.setState({[name]:value}, () => this.validateEmail(this.state.labelEmail));
  }

  onSubmitForm = (event) => {
    const { labelText, labelEmail, labelName } = this.state;
    event.preventDefault();

    this.props.onCreateTask(labelText, labelEmail, labelName);
    this.setState({
      labelText: '',
      labelEmail: '',
      labelName: ''
    });
  }

  validateEmail(email) {
    let emailValid = this.state.emailValid;
    let emailError = this.state.emailError;

    if (email) {
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      emailError = emailValid ? '' : 'Sorry, but email is invalid';
    }
    this.setState({
      emailValid,
      emailError
    })
  }

  render() {
    return (
      <ItemAddForm
        onSubmitForm={this.onSubmitForm}
        onLabelChange={this.onLabelChange}
        labelText={this.state.labelText}
        labelEmail={this.state.labelEmail}
        labelName={this.state.labelName}
        onCreateTask={this.props.onCreateTask}
        emailError={this.state.emailError}
        emailValid={this.state.emailValid}
      />
    );
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { beeJeeService } = ownProps;

  return {
    onCreateTask: (text, email, name) => {
      dispatch(taskCreateRequestedAction());

      beeJeeService
        .createTask(text, email, name)
        .then( (task) => dispatch(taskCreateSuccessAction(task)) )
        .catch( (error) => dispatch(taskCreateErrorAction(error)) )
    }
  }
}

export default withBeeJeeService()(connect(mapStateToProps, mapDispatchToProps)(ItemAddFormContainer));