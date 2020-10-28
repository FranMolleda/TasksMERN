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
        tasksproject: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };

    case ADD_TASKS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
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
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case UPDATE_TASK:
    case TASK_CHANGE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
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
