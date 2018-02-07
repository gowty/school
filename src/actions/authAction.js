"use strict";
import axios from "axios";

export function signUp(user) {
  return function(dispatch) {
    axios
      .post("/signup", user)
      .then(function(response) {
        dispatch({ type: "signUp", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "signUpRejected", payload: err });
      });
  };
}

export function signIn(user) {
  return function(dispatch) {
    axios
      .post("/signin", user)
      .then(function(response) {
        dispatch({ type: "signIn", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "signInRejected", payload: err });
      });
  };
}

export function logout(user) {
  return function(dispatch) {
    axios
      .get("/logout")
      .then(function(response) {
        dispatch({ type: "logout", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "logoutRejected", payload: err });
      });
  };
}

export function getAuth() {
  return function(dispatch) {
    axios
      .get("/auth", {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then(function(response) {
        dispatch({ type: "getAuth", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "getAuthRejected", payload: err });
      });
  };
}

export function forgotPassword(email) {
  return function(dispatch) {
    axios
      .post("/create-forgot-password-link", email)
      .then(function(response) {
        dispatch({ type: "forgotPasswordlink", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "forgotPasswordlinkRejected", payload: err });
      });
  };
}
