import axios from "../../helpers/_axios";

export default class AddonService{

    async getAddons(){
       const {data} = await axios.get('/add-ons');
        return data
    }

    async createAddons(addons){
       const {data} = await axios.post('/add-ons',{...addons});
        return data
    }
    async findAddons(id){
       const {data} = await axios.get(`/add-ons/${id}`);
        return data
    }
    async updateAddons(id,addons){
       const {data} = await axios.put(`/add-ons/${id}`,{...addons});
        return data
    }
}