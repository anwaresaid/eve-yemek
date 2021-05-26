import axios from "../../helpers/_axios";

export default class AddonService{

    async getAddons(){
       const {data} = await axios.get('https://dev.eve-yemek.com/add-ons');
        return data
    }

    async createAddons(addons){
       const {data} = await axios.post('https://dev.eve-yemek.com/add-ons',{...addons});
        return data
    }
    async findAddons(id){
       const {data} = await axios.get(`https://dev.eve-yemek.com/add-ons/${id}`);
        return data
    }
    async updateAddons(id,addons){
       const {data} = await axios.put(`https://dev.eve-yemek.com/add-ons/${id}`,{...addons});
        return data
    }
}