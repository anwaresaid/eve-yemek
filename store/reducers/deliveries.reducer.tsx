import { deliveriesTypes } from '../types/deliveries.type';

export const listDeliveriesReducer = (state = {}, action) => {
  switch (action.type) {
    case deliveriesTypes.DELIVERY_LIST_REQUEST:
      return { loading: true };

    case deliveriesTypes.DELIVERY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        deliveries: action.payload,
      };

    case deliveriesTypes.DELIVERY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case deliveriesTypes.DELIVERY_LIST_RESET:
      return {};

    default:
      return state;
  }
};
