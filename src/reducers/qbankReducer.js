"use strict";

export function qbankReducer(
  state = { qbank: [], answers: [0, 0, 0, 0, 0, 0] },
  action
) {
  switch (action.type) {
    case "getQbank":
      return {
        qbank: action.payload,
        answers: state.answers
      };
      break;
    case "updateAnswer":
      const ans = [...state.answers];
      return {
        qbank: state.qbank,
        answers: [
          ...ans.slice(0, action.payload.index),
          action.payload.value,
          ...ans.slice(action.payload.index + 1)
        ]
      };
      break;
  }

  return state;
}
