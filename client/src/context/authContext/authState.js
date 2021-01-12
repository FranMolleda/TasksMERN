import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTER_OK,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_OK,
  LOGIN_ERROR,
  LOGOUT_OK,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Las Funciones
  const userRegister = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);
      console.log(response.data);

      dispatch({
        type: REGISTER_OK,
        payload: response.data,
      });

      //Obtener el usuario
      AuthUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };

      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  //Devuelve el usuario autenticado
  const AuthUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Cuando el usuario inicia sesion
  const sessionInit = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);

      dispatch({
        type: LOGIN_OK,
        payload: response.data,
      });

      AuthUser();
    } catch (error) {
      //console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  //Cerrar la sesion de usuario
  const logOut = () => {
    dispatch({
      type: LOGOUT_OK,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        userRegister,
        sessionInit,
        AuthUser,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
