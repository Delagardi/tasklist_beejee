import React from 'react';
import { connect } from 'react-redux';
import { isEditingAction } from '../../actions';

import './task-list-item.css';

const TaskListItem = (props) => {

  const onEdit = (id) => {
    props.isEditing(id);
  }

  const {
    id, 
    username, 
    email, 
    text, 
    status,
    isLoggedIn
  } = props;

  const statusClassName = status > 0 ? "fa fa-check-square-o fa-lg" : "fa fa-square-o fa-lg";

  const editButton = isLoggedIn
    ? <button 
        type="button"
        className="btn btn-outline-success btn-sm float-right edit"
        onClick={() => onEdit(id)}>
          <i className="fa fa-pencil" />
      </button>
    : null;
  
  return ( 
    <li key={id} className="list-group-item">
      <span className="todo-list-item-wrapper">
        <span 
          className="todo-list-item-label text">
          {text}
        </span>
        <span
          className="todo-list-item-label email">
          {email}
        </span>
        <span 
          className="todo-list-item-label username">
          {username}
        </span>
        <span className="actions d-flex">
          <button 
            type="button"
            className="btn btn-outline-success btn-sm float-right">
            <i className={statusClassName} />
          </button>
          {editButton}
        </span>
      </span>
    </li>
  );
}

const mapStateToProps = ({ isLoggedIn }) => {
  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isEditing: (editableID) => dispatch(isEditingAction(editableID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);
