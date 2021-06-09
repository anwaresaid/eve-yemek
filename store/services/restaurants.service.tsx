import { baseUrl } from "../../helpers/constants";
import axios from "../../helpers/_axios";

export default class RestaurantsService {

    async getRestaurants() {
        const {data}  = await axios.get(baseUrl + '/restaurants')
        return data;
    }

    async findRestaurant(id) {
        const {data}  = await axios.get(baseUrl + `/restaurants/${id}`)
        return data;
    }

    async getRestaurantOwners(){
        const {data} = await axios.get(baseUrl + '/users?fields=roles&text=restaurant_owner');
        return data
    }

    async createRestaurant(restaurantCreate){
        const {data} = await axios.post(baseUrl + `/restaurants/`,{...restaurantCreate});
        return data;
    }

    async updateRestaurant(id,restaurantUpdate){
        const {data} = await axios.put(baseUrl + `/restaurants/${id}`,{...restaurantUpdate});
        return data;
            }
    }
