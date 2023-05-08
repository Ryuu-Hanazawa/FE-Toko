import * as actionTypes from "../actionTypes";

export const login = (token, id, level, name, email) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      token: token,
      id: id,
      level: level,
      name: name,
      email: email,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const setEmail = (email) => {
  return {
    type: actionTypes.SET_EMAIL,
    payload: email,
  };
};

export const removeEmail = (email) => {
  return {
    type: actionTypes.REMOVE_EMAIL,
  };
};

export const passToken = (token) => {
  return {
    type: actionTypes.GET_TOKEN,
    token,
  };
};