import OrdersService from "../services/orders.service";
import { ordersTypes } from "../types/orders.type";

const initialState = [];

export const listOrdersReducer = (state = { orders: { items: [] } }, action) => {
  switch (action.type) {
    case ordersTypes.ORDER_LIST_REQUEST:
      return { loading: true }
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
    case ordersTypes.ORDER_LIST_UPDATE:
      for (let i = 0; i < state.orders.items.length; i++) {
        if (state.orders.items[i].id === action.payload.id) {
          state.orders.items[i] = action.payload
          return {
            ...state
          }
        }
      }
    default:
      return state;
  }
};

export const findOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ordersTypes.FIND_ORDER_REQUEST:
      return { loading: true }
    case ordersTypes.FIND_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload
      }
    case ordersTypes.FIND_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
