import {
  TASKS_PROJECT,
  ADD_TASKS,
  TASK_VALIDATE,
  TASK_DELETE,
  TASK_CHANGE,
  ACTUAL_TASK,
  UPDATE_TASK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksproject: state.tasksproject.filter(
          (task) => task.projectId === action.payload
        ),
      };

    case ADD_TASKS:
      return {
        ...state,
        tasksproject: [action.payload, ...state.tasksproject],
        taskerror: false,
      };

    case TASK_VALIDATE:
      return {
        ...state,
        taskerror: true,
      };

    case TASK_DELETE:
      return {
        ...state,
        tasksproject: state.tasksproject.filter(
          (task) => task.id !== action.payload
        ),
      };

    case UPDATE_TASK:
    case TASK_CHANGE:
      return {
        ...state,
        tasksproject: state.tasksproject.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        taskselected: null,
      };

    case ACTUAL_TASK:
      return {
        ...state,
        taskselected: action.payload,
      };

    default:
      return state;
  }
};
