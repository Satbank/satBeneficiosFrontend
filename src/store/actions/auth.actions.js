import { Http } from "../../conf/GlobalConf";
import { changeloading } from "./loading.action";
import { changeNotify } from './notify.actions';

export const actionTypes = {
  GET_TOKEN: "GET_TOKEN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CHANGE: "CHANGE",
};

export const getToken = (token) => ({
  type: actionTypes.GET_TOKEN,
  token,
});
export const removeToken = () => ({
  type: actionTypes.LOGOUT,
});
export const loginSuccess = (bool) => ({
  type: actionTypes.SUCCESS,
  bool,
});
export const loginError = (error) => ({
  type: actionTypes.ERROR,
  error,
});
export const changeValue = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});
export const loading = (bool, msg = null) => ({
  type: actionTypes.LOADING,
  isLoading: {
    active: bool,
    msg: msg,
  },
});
export const getUserToken = () => (dispatch) => {
  dispatch(loading(true));
  const token = localStorage.getItem("access_token");
  dispatch(loading(false));
  if (token) {
    dispatch(getToken(token));
  }
};
export const showWelcomeMessage = () => {
  return {
    type: "SHOW_WELCOME_MESSAGE",
    message: "Bem-vindo!",
  };
};

export const setUserToken = (token) => (dispatch) => {
  localStorage.setItem("access_token", token);  
  dispatch(loading(false));
  dispatch(loginSuccess(true));
};
export const login = (credentials) => {
  return (dispatch) => {
    dispatch(changeloading({ open: true, msg: "Autenticando usuário..." }));
    
    return Http.post("/oauth/token", {
      grant_type: "password",
      client_id: "4",
      client_secret: "fdqeI3SjFnUpWg44UMoZUf276kplCzZAmNOhtOsE",
      username: credentials.username,
      password: credentials.password,
    })
    .then((res) => {
      dispatch(changeloading({ open: false, msg: "" }));

      if (typeof res !== "undefined") {
        dispatch(setUserToken(res.data.access_token));
      }
    })
    .catch((error) => {
      dispatch(changeloading({ open: false }));
      
      if (error.response && error.response.status) {
        if (error.response.status === 401 || error.response.status === 400) {
          dispatch(
            changeNotify({
              open: true,
              class: "error",
              msg: "Erro de autenticação. Verifique suas credenciais.",
            })
          );
        } else if (error.response.status === 500) {
          dispatch(
            changeNotify({
              open: true,
              class: "error",
              msg: "Erro interno do servidor. Tente novamente mais tarde.",
            })
          );
        } else {
          dispatch(
            changeNotify({
              open: true,
              class: "error",
              msg: `Erro: ${error.message}`,
            })
          );
        }
      } else {
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: "Erro ao se conectar ao servidor. Verifique sua conexão com a internet.",
          })
        );
      }
    });
  };
};
