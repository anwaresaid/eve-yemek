import { parseDateInOneRow } from "../../helpers/dateFunctions";
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
      console.log(action.payload)
      let ordersService = new OrdersService()
      ordersService.getOrder(action.payload).then((res) => {
        for (let i = 0; i < state.orders.items.length; i++) {
          if (state.orders.items[i].order === action.payload) {
            console.log(state.orders.items[i])
            state.orders.items[i] = parseDateInOneRow(res)
            return {
              ...state
            }
          }
        }
      })

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
        orderData: action.payload
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
