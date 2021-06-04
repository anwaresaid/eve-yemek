import axios from '../../helpers/_axios';

export default class CouponService {
  async getAllCoupons() {
    const { data } = await axios.get('https://dev.eve-yemek.com/coupon');
    return data;
  }
  async createCoupon(coupon) {
    const { data } = await axios.post('https://dev.eve-yemek.com/coupon', coupon);
    return data;
  }
}
