import { testTypes } from "../types/test.type";

const initialState = [];

function tutorialReducer(tutorials = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case testTypes.TEST_ACTION:
      return { data:"..." }

    default:
      return tutorials;
  }
};

export default tutorialReducer;