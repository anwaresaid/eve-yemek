import { couponsTypes } from '../types/coupons.type';

const initialState = [];
export const listCouponsReducer = (state = [], action) => {
  switch (action.type) {
    case couponsTypes.COUPON_LIST_REQUEST:
      return { loading: true };

    case couponsTypes.COUPON_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        coupons: action.payload,
      };

    case couponsTypes.COUPON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createCouponsReducer = (state = [], action) => {
  switch (action.type) {
    case couponsTypes.COUPON_CREATE_REQUEST:
      return { loading: true };

    case couponsTypes.COUPON_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        coupon: action.payload,
      };

    case couponsTypes.COUPON_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case couponsTypes.COUPON_CREATE_RESET:
      return {};

    default:
      return state;
  }
};


export const findCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case couponsTypes.COUPON_FIND_REQUEST:
      return { loading: true };
    case couponsTypes.COUPON_FIND_SUCCESS:
      return {
        loading: false,
        success: true,
        coupon: action.payload,
        
      };
    case couponsTypes.COUPON_FIND_RESET:
      return {};

    case couponsTypes.COUPON_FIND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case couponsTypes.COUPON_UPDATE_REQUEST:
      return { loading: true };
    case couponsTypes.COUPON_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        coupon: action.payload,
      };
    case couponsTypes.COUPON_UPDATE_RESET:
      return {};

    case couponsTypes.COUPON_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

