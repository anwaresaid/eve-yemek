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

export const listDeliveryDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case deliveriesTypes.DELIVERY_LIST_DETAILS_REQUEST:
      return { loading: true };

    case deliveriesTypes.DELIVERY_LIST_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        deliveryDetails: action.payload,
      };

    case deliveriesTypes.DELIVERY_LIST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case deliveriesTypes.DELIVERY_LIST_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
