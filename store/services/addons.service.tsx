import axios from "../../helpers/_axios";

export default class AddonService{

    async getAddons(){
       const {data} = await axios.get('https://dev.eve-yemek.com/add-ons');
        return data
    }
}