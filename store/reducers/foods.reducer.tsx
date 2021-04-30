import { foodsTypes } from "../types/foods.type";

const initialState = [];

function tutorialReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case foodsTypes.GET_ALL_FOODS:
      return { data: payload}

    default:
      return state;
  }
};

export default tutorialReducer;