import axios from '../../helpers/_axios';

export default class SettingsService {
  public async getSettings() {
    const { data } = await axios.get('https://dev.eve-yemek.com/dashboard-settings');
    return data;
  }

  public async updateSettings(updateSettingsDTO:any) {
    const { data } = await axios.put('https://dev.eve-yemek.com/dashboard-settings', updateSettingsDTO);
    return data;
  }
}
