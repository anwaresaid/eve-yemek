import axios from "../../helpers/_axios";

export default class UsersListsService {

    async getCustomers() {
        const {data}  = await axios.get('https://dev.eve-yemek.com/users?fields=roles&text=customer')
        return data;
    }

    async getSingleUser(id) {
        const {data}  = await axios.get('https://dev.eve-yemek.com/users/'+id)
        return data;
    }

    async updateUser(id, userData){
        const {data} = await axios.put(`https://dev.eve-yemek.com/users/${id}`,{...userData});
        return data;
    }
}