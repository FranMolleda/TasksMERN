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
      return {
        alert: action.payload,
      };

    default:
      return state;
  }
};
