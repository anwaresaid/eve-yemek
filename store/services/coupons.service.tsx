import axios from '../../helpers/_axios';

export default class CouponService {
  async getAllCoupons(offset, limit, fields = null, text = null) {
    var query
    if (!fields || fields == '' || !text || text == '') {
      query = '/coupon?offset=' + offset + '&limit=' + limit
    } else {
      query = '/coupon?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
    }
    const { data: { data } } = await axios.get(query)
    return data;
  }
  async createCoupon(coupon) {
    const { data: { data } } = await axios.post('/coupon', coupon);
    return data;
  }
}
