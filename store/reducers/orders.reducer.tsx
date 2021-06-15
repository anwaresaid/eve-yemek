import { ordersTypes } from "../types/orders.type";

const initialState = [];

export const listOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersTypes.ORDER_LIST_REQUEST:
      return { loading: true}
    case ordersTypes.ORDER_LIST_SUCCESS: 
      return {
        loading: false,
        success: true,
        orders: action.payload
      }

    case ordersTypes.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

export const findOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ordersTypes.ORDER_FIND_REQUEST:
        return { loading: true}
      case ordersTypes.ORDER_FIND_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload
        }
  
      case ordersTypes.ORDER_FIND_FAIL:
        return {
          loading: false,
          error: action.payload
        } 
        
      default:
        return state;
    }
  };