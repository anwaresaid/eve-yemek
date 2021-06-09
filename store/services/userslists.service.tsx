import { baseUrl } from "../../helpers/constants";
import axios from "../../helpers/_axios";

export default class UsersListsService {

    async getUsersByRole(role) {
        const {data}  = await axios.get(baseUrl + '/users?fields=roles&text='+role)
        return data;
    }

    async getSingleUser(id) {
        const {data}  = await axios.get(baseUrl + '/users/'+id)
        return data;
    }

    async addUser(userData){
        const {data} = await axios.post(baseUrl + `/users`,{...userData});
        return data;
    }

    async updateUser(id, userData){
        
        const {data} = await axios.put(baseUrl + `/users/${id}`,{...userData});
        return data;
    }
}