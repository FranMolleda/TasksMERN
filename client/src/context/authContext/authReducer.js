import {
  REGISTER_OK,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_OK,
  LOGIN_ERROR,
  LOGOUT_OK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_OK:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        message: action.payload,
      };

    default:
      return state;
  }
};
