import axios from '../../helpers/_axios';

export default class DeliveryService {
  async getAllDeliveries() {
    const { data:{data} } = await axios.get('/delivery');
    return data;
  }
  
  async getDeliveryDetails(id) {
    const { data:{data} } = await axios.get(`/delivery/details/${id}`);
    return data;
  }
}
