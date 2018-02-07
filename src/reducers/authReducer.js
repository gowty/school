"use strict";

export function authReducer(state = { user: {} }, action) {
  switch (action.type) {
    case "signUp":
      localStorage.setItem("token", action.payload.token);
      return {
        user: action.payload.user
      };
      break;

    case "signIn":
      localStorage.setItem("token", action.payload.token);
      return {
        user: action.payload.user
      };
      break;

    case "logout":
      localStorage.removeItem("token");
      return {
        user: {}
      };
      break;

    case "getAuth":
      return {
        user: action.payload
      };
      break;
  }

  return state;
}
