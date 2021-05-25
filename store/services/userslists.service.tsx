import axios from "../../helpers/_axios";

export default class UsersListsService {

    async getUsersByRole(role) {
        const {data}  = await axios.get('https://dev.eve-yemek.com/users?fields=roles&text='+role)
        return data;
    }

    async getSingleUser(id) {
        const {data}  = await axios.get('https://dev.eve-yemek.com/users/'+id)
        return data;
    }

    async addUser(userData){
        const {data} = await axios.post(`https://dev.eve-yemek.com/users`,{...userData});
        return data;
    }

    async updateUser(id, userData){
        
        const {data} = await axios.put(`https://dev.eve-yemek.com/users/${id}`,{...userData});
        return data;
    }
}