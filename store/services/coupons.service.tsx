import { baseUrl } from '../../helpers/constants';
import axios from '../../helpers/_axios';

export default class CouponService {
  async getAllCoupons() {
    const { data } = await axios.get(baseUrl + '/coupon');
    return data;
  }
  async createCoupon(coupon) {
    const { data } = await axios.post(baseUrl + '/coupon', coupon);
    return data;
  }
}
