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

  async updateCoupon(id, coupons){ 
    const {data:{data}} = await axios.put(`/coupon/${id}`,{...coupons})
  }
  
  async findCoupon(id){ 
    const {data:{data}} = await axios.get(`/coupon${id}`)
  }
}
