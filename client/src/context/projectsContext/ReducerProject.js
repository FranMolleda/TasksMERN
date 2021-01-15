import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  PROJECT_ERROR,
  FORM_VALIDATE,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state,
        form: true,
      };

    case GET_PROJECTS:
      return {
        ...state,
        //Ponemos lo mismo que hemos puesto en el payload de la funcion getProjects en StateProject
        projects: action.payload,
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        form: false,
        formerror: false,
      };

    case FORM_VALIDATE:
      return {
        ...state,
        formerror: true,
      };

    case ACTUAL_PROJECT:
      return {
        ...state,
        project: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        project: null,
      };

    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
