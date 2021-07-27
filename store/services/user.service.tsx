import axios from '../../helpers/_axios';
import _axios from 'axios';
import { baseUrl } from "../../helpers/constants";
export default class UserService {
  public async login(email: string, password: string, remember: boolean) {
    if (!email || !password) {
      return { ok: false, err: 'Email or password is empty' };
    }

    return axios
      .post('/users/login', {
        email,
        password,
        remember,
      })
      .then((res) => {
        return { ok: true, data: res.data.data };
      })
      .catch((err) => {
        return { ok: false, err: err?.data || err?.response?.data };
      });
  }

  public async changePassword(new_password: string, password: string) {
    const {
      data: { data },
    } = await axios.put(`/users/change-password`, { new_password, password });
    return data;
  }

  public async resetPasswordRequest(email: string){
    const {
        data: { data },
      } = await _axios.post(`${baseUrl}/users/resetPasswordRequest`, { email });
  
      return data;
  }

  public async resetPassword(password: string, token: string, id: string){
    const {
      data: { data },
    } = await _axios.post(`${baseUrl}/users/resetPassword?token=${token}&id=${id}`, { password });

    return data;
  }
}