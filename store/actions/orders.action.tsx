import { ordersTypes } from "../types/orders.type"
import OrdersService from "../services/orders.service"
import { parseDateInAllRows } from "../../helpers/dateFunctions";



export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ordersTypes.ORDER_LIST_REQUEST,
      })
  
      const orderService = new OrdersService;
      const res = await orderService.getOrders({offset: 0, limit: 9999})
      dispatch({
        type: ordersTypes.ORDER_LIST_SUCCESS,
        payload: parseDateInAllRows(res),
      });
    } catch (error) {
      dispatch({
        type: ordersTypes.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
export const findOrder = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ordersTypes.FIND_ORDER_REQUEST,
      });
  
      const orderService = new OrdersService
      const res = await orderService.getOrder(id)
      dispatch({
        type: ordersTypes.FIND_ORDER_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: ordersTypes.FIND_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };