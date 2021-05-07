import { foodsTypes } from "../types/foods.type";

const initialState = [];

function tutorialReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_CREATE_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        food: action.payload
      }

    case foodsTypes.FOOD_CREATE_SUCCESS:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

export default tutorialReducer;