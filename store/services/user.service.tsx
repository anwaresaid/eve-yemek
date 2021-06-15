import axios from "../../helpers/_axios";

const UserService = function () {
  
    const login = async (email:string, password:string, remember:boolean) => {

        if(!email || !password){
            return { ok:false, err:"Email or password is empty" }
        }

        return axios.post("/users/login", {
            email,
            password,
            remember
        })
        .then(res=>{
            return { ok:true, data: res.data };
        })
        .catch(err=>{
            return { ok:false, err:err?.data || err?.response?.data }
        })
    };
  
    return Object.freeze({
        login
    });
  };
  
  export default UserService();