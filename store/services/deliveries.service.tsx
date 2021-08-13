import axios from '../../helpers/_axios';

export default class DeliveryService {
  async getAllDeliveries() {
    const { data:{data} } = await axios.get('/delivery');
    return data;
  }
}
