import axios from '../../helpers/_axios';

export default class CouponService {
  async getAllCoupons() {
    const { data } = await axios.get('/coupon');
    return data;
  }
  async createCoupon(coupon) {
    const { data } = await axios.post('/coupon', coupon);
    return data;
  }
}
