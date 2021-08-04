import { deliveriesTypes } from '../types/deliveries.type';

export const listDeliveries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: deliveriesTypes.DELIVERY_LIST_REQUEST,
    });

    dispatch({
      type: deliveriesTypes.DELIVERY_LIST_SUCCESS,
      payload: {},
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
