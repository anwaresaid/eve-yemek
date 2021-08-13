import axios from '../../helpers/_axios';

export default class DeliveryService {
  async getAllDeliveries(offset, limit, fields = null, text = null) {
    var query
    if (!fields || fields == '' || !text || text == '') {
      query = '/delivery?offset=' + offset + '&limit=' + limit
    } else {
      query = '/delivery?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
    }
    const { data: { data } } = await axios.get(query)
    return data;
  }
}
