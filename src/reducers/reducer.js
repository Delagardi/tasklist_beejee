const initialState = {
  tasks: [],
  loading: true,
  error: null,
  currentPage: 1,
  totalTaskCount: 0,
  isAsc: true,
  isLoggedIn: false,
  isEdit: false,
  editableID: null,
  editableTask: {
    id: null,
    text: '',
    email: '',
    username: '',
    status: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }

    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        totalTaskCount: action.meta,
        loading: false,
        error: null
      }
     
    case 'FETCH_TASKS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case 'CHANGE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
      
    case 'CHANGE_SORT_DIRECTION':
      return {
        ...state,
        isAsc: !state.isAsc
      }
    
    case 'FETCH_TASK_CREATE_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    }
    
    case 'FETCH_TASK_CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      }
     
    case 'FETCH_TASK_CREATE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'LOGGED_IN':
      return {
        ...state,
        isLoggedIn: true
      }

    case 'LOGGED_OUT':
      return {
        ...state,
        isLoggedIn: false
      }

    case 'EDIT_TASK':
      return {
        ...state,
        isEdit: !state.isEdit,
        editableID: action.payload
      }
    
    case 'SET_EDITABLE_TASK':
      return {
        ...state,
        editableTask: action.payload
      }

    default:
      return state
  }
}

export default reducer;