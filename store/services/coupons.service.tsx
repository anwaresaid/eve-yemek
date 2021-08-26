import axios from '../../helpers/_axios';

export default class CouponService {
  async getAllCoupons(...args) {
    let query = '/coupon?'
    Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&') : '')
    const { data: { data } } = await axios.get(query)
    return data;
  }
  async createCoupon(coupon) {
    const { data: { data } } = await axios.post('/coupon', coupon);
    return data;
  }
}
