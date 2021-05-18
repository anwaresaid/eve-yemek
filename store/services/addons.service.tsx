import axios from "../../helpers/_axios";

export default class AddonService{

    getAddons(){
        return axios.get('https://dev.eve-yemek.com/add-ons')
        .then(res => res.data)
    }
}