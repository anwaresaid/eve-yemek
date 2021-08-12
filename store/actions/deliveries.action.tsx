import { deliveriesTypes } from '../types/deliveries.type';
import DeliveryService from '../services/deliveries.service';

export const listDeliveries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: deliveriesTypes.DELIVERY_LIST_REQUEST,
    });

    const deliveryService = new DeliveryService();
    const res = await deliveryService.getAllDeliveries(0, 9999);
    dispatch({
      type: deliveriesTypes.DELIVERY_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: deliveriesTypes.DELIVERY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
