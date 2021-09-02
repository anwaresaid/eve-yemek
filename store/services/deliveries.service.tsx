import axios from '../../helpers/_axios';

export default class DeliveryService {

  async getAllDeliveries(...args) {
    let query = '/delivery?'
    Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&') : '')
    const { data: { data } } = await axios.get(query);
    return data;
  }

  async getDeliveryDetails(id) {
    const { data: { data } } = await axios.get(`/delivery/details/${id}`);
    return data;
  }

  async getScoutData(scoutUserID) {
    const { data: { data } } = await axios.get('/delivery/scout/' + scoutUserID)
    return data;
  }

}
