import axios from '../../helpers/_axios';

export default class UsersListsService {
  async getUsersByRole(role) {
    const { data: { data } } = await axios.get('/users?fields=roles&text=' + role);
    return data;
  }

  async getDeliveryScouts() { // this is among the delivery endpoints, so it is different from Get Users by Role
    const { data: { data } } = await axios.get('/delivery/all');
    return data;
  }

  async getScoutDetails(id){
    const { data: { data } } = await axios.get('/delivery/' + id);
    return data;
  }

  async getUsersByCountryAndRole(countryCode, role) {
    let countryQuery = countryCode ? ('country=' + countryCode + '&') : ''
    let roleQuery = role ? ('role=' + role) : ''
    const { data: { data } } = await axios.get('/users/custom?' + countryQuery + roleQuery);
    return data;
  }

  async getSingleUser(id) {
    const { data: { data } } = await axios.get('/users/' + id);
    return data;
  }

  async addUser(userData) {
    const { data: { data } } = await axios.post(`/users`, { ...userData });
    return data;
  }

  async updateUser(id, userData) {
    const { data: { data } } = await axios.put(`/users/${id}`, { ...userData });
    return data;
  }

  async getFcmTokensFromUserIds(userIds) {
    const { data: { data } } = await axios.post(`/user-token/get-fcm-tokens`, {
      user_ids: userIds,
    });
    return data;
  }
}
