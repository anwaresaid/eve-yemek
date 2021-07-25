import axios from '../../helpers/_axios';

// const UserService = function () {
//   const login = async (email: string, password: string, remember: boolean) => {
//     if (!email || !password) {
//       return { ok: false, err: 'Email or password is empty' };
//     }

//     return axios
//       .post('/users/login', {
//         email,
//         password,
//         remember,
//       })
//       .then((res) => {
//         return { ok: true, data: res.data.data };
//       })
//       .catch((err) => {
//         return { ok: false, err: err?.data || err?.response?.data };
//       });
//   };

//   const changePassword = async (new_password: string, password: string) => {
//     const {
//       data: { data },
//     } = await axios.put(`/users/change-password`, { new_password, password });
//     return data;
//   };

//   const resetPasswordRequest = async (email: string) => {
//     const {
//       data: { data },
//     } = await axios.post('/users/resetPasswordRequest', { email });

//     return data;
//   };

//   return Object.freeze({
//     login,
//     changePassword,
//     resetPasswordRequest,
//   });
// };

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
      } = await axios.post('/users/resetPasswordRequest', { email });
  
      return data;
  }
}

// export default UserService();
