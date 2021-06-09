import { baseUrl } from "../../helpers/constants";
import axios from "../../helpers/_axios";

export default class AddonService{

    async getAddons(){
       const {data} = await axios.get(baseUrl + '/add-ons');
        return data
    }

    async createAddons(addons){
       const {data} = await axios.post(baseUrl + '/add-ons',{...addons});
        return data
    }
    async findAddons(id){
       const {data} = await axios.get(baseUrl + `/add-ons/${id}`);
        return data
    }
    async updateAddons(id,addons){
       const {data} = await axios.put(baseUrl + `/add-ons/${id}`,{...addons});
        return data
    }
}