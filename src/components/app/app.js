import React, { Component } from 'react';
import Header from '../header';
import TaskFilter from '../task-filter';
import TaskList from '../task-list';
import ItemAddForm from '../item-add-form';
import { connect } from 'react-redux';
import ErrorIndicator from '../error-indicator';
import Pagination from '../pagination';
import ItemEditForm from '../item-edit-form';

import './app.css';

class App extends Component {
  render() {
    const { 
      error,
      isEdit
     } = this.props;

    if (error) {
      return <ErrorIndicator />
    }

    const formComponent = isEdit ? <ItemEditForm /> : <ItemAddForm />

    return (
      <div className='todo-app'>
        <Header />
        <TaskFilter />
        <TaskList />
        {formComponent}
        <Pagination/>
      </div>
    );
  }
}

const mapStateToProps = ({ error, currentPage, totalTaskCount, isEdit }) => {
  return {
    error,
    currentPage,
    totalTaskCount,
    isEdit
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
