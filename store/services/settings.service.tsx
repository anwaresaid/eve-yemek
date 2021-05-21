import axios from '../../helpers/_axios';

export default class SettingsService {
  public async getSettings() {
    const { data } = await axios.get('https://dev.eve-yemek.com/dashboard-settings');
    return data;
  }
}
