const tasksRequestedAction = () => {
  return ({
    type: 'FETCH_TASKS_REQUEST',
  })
}

const tasksLoadedAction = (newTasks) => {
  return ({
    type: 'FETCH_TASKS_SUCCESS',
    payload: newTasks.tasks,
    meta: newTasks.total_task_count
  })
}

const tasksLoadErrorAction = (errorMessage) => {
  return ({
    type: 'FETCH_TASKS_FAILURE',
    payload: errorMessage
  })
}

const changeCurrentPageAction = (newPage, maxPage) => {
  if (newPage > maxPage) {
    newPage -= 1;
  } else if (newPage < 1) {
    newPage += 1;
  }

  return {
    type: 'CHANGE_CURRENT_PAGE',
    payload: newPage
  }
}

const changeSortDirectionAction = () => {
  return ({
    type: 'CHANGE_SORT_DIRECTION'
  });
}

const taskCreateRequestedAction = () => {
  return ({
    type: 'FETCH_TASK_CREATE_REQUEST',
  })
}

const taskCreateSuccessAction = (task) => {
  return ({
    type: 'FETCH_TASK_CREATE_SUCCESS',
    payload: task,
  })
}

const taskCreateErrorAction = (errorMessage) => {
  return ({
    type: 'FETCH_TASK_CREATE_FAILURE',
    payload: errorMessage
  })
}

const isLoggedInTrueAction = () => {
  return ({
    type: 'LOGGED_IN'
  })
}

const isLoggedInFalseAction = () => {
  return ({
    type: 'LOGGED_OUT'
  })
}

const isEditingAction = (editableID) => {
  if (editableID === undefined) {
    editableID = null;
  }
  return ({
    type: 'EDIT_TASK',
    payload: editableID
  })
}

const setEditableTaskAction = (editableTask) => {
  if (editableTask === undefined) {
    editableTask = {
      id: null,
      text: '',
      email: '',
      username: '',
      status: ''
    }
  }
  return {
    type: 'SET_EDITABLE_TASK',
    payload: editableTask
  }
}

export {
  tasksRequestedAction,
  tasksLoadedAction,
  tasksLoadErrorAction,
  changeCurrentPageAction,
  changeSortDirectionAction,
  taskCreateRequestedAction,
  taskCreateSuccessAction,
  taskCreateErrorAction,
  isLoggedInTrueAction,
  isLoggedInFalseAction,
  isEditingAction,
  setEditableTaskAction
}