const initialTasks = {
  tasks: [{
    name: 'Task',
    plugins:[]
  }],
  plugins: [],
  cf: ['fake cf data 1', 'fake cf data 2', 'something', 'user is lame', 'upity do dah'],
  currentTask: {
    name: 'test',
    plugins: []
  }
}


export default function(state = initialTasks, action) {

  switch(action.type) {
    case 'CHANGE_PLUGINS':
      return Object.assign({}, state, {
        tasks: state.tasks,
        cf: state.cf,
        currentTask: state.currentTask,
        plugins: action.payload
      })
    case 'CHANGE_TASK':
      return Object.assign({}, state, {
        tasks: action.payload,
        cf: state.cf,
        currentTask: state.currentTask,
        plugins: state.plugins
      })
    case 'CHANGE_CURRENT_TASK':
      return Object.assign({}, state, {
        tasks: state.tasks,
        cf: state.cf,
        currentTask: action.payload,
        plugins: state.plugins
      })
    case 'LOAD_CF':
      return Object.assign({}, state, {
        tasks: state.tasks,
        cf: action.payload,
        currentTask: state.currentTask,
        plugins: state.plugins
      })
    default :
      return state
  }
}

