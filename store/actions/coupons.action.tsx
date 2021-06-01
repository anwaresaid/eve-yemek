import { couponsTypes } from '../types/coupons.type';
import CouponService from '../services/coupons.service';

export const listCoupons = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: couponsTypes.COUPON_LIST_REQUEST,
    });

    const couponsService = new CouponService();
    const res = await couponsService.getAllCoupons();
    dispatch({
      type: couponsTypes.COUPON_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: couponsTypes.COUPON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
