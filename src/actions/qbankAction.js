"use strict";
import axios from "axios";

export function getQbank() {
  return function(dispatch) {
    axios
      .get("/qbank")
      .then(function(response) {
        dispatch({ type: "getQbank", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "getQbankRejected", payload: err });
      });
  };
}

export function updateAnswer(update) {
  return {
    type: "updateAnswer",
    payload: update
  };
}

export function testSubmission(ans) {
  return function(dispatch) {
    axios
      .post("/test-submission", ans)
      .then(function(response) {
        dispatch({ type: "testSubmission", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "testSubmissionRejected", payload: err });
      });
  };
}
