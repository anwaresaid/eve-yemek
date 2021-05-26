import { ordersTypes } from "../types/orders.type";
import OrdersService from "../services/orders.service";



export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ordersTypes.ORDER_LIST_REQUEST,
      });
  
      const orderService = new OrdersService;
      const res = await orderService.getOrders();
      dispatch({
        type: ordersTypes.ORDER_LIST_SUCCESS,
        payload: res,
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
        type: ordersTypes.ORDER_FIND_REQUEST,
      });
  
      const orderService = new OrdersService;
      const res = await orderService.getOrder(id);
      dispatch({
        type: ordersTypes.ORDER_FIND_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: ordersTypes.ORDER_FIND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };