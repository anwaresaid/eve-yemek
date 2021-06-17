import axios from '../../helpers/_axios';

export default class SettingsService {
  public async getSettings() {
    const { data } = await axios.get('/dashboard-settings');
    return data;
  }

  public async updateSettings(updateSettingsDTO:any) {
    const { data } = await axios.put('/dashboard-settings', updateSettingsDTO);
    return data;
  }

  public async forgotPasswordRequest(email:string){
    const { data } = await axios.post("/users/resetPasswordRequest", { email });
    return data;
  }
}
