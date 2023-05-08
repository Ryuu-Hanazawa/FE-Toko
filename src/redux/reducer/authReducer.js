import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  isLogin: false,
  token: null,
  id: null,
  level: null,
  name: null,
  email: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        id: action.payload.id,
        level: action.payload.level,
        name: action.payload.name,
        email: action.payload.email,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: null,
        id: null,
        level: null,
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case actionTypes.REMOVE_EMAIL:
      return {
        ...state,
        email: '',
      }
    case actionTypes.GET_TOKEN:
      return {
        ...state,
        newState: action.token,
      }
    default:
      return state;
  }
};

export default authReducer;
