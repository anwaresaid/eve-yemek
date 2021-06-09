import { baseUrl } from '../../helpers/constants';
import axios from '../../helpers/_axios';

export default class SettingsService {
  public async getSettings() {
    const { data } = await axios.get(baseUrl + '/dashboard-settings');
    return data;
  }

  public async updateSettings(updateSettingsDTO:any) {
    const { data } = await axios.put(baseUrl + '/dashboard-settings', updateSettingsDTO);
    return data;
  }
}
