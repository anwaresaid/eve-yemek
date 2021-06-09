import axios from "../../helpers/_axios";

export default class RestaurantsService {

    async getRestaurants() {
        const {data}  = await axios.get('https://api.eve-yemek.com/restaurants')
        return data;
    }

    async findRestaurant(id) {
        const {data}  = await axios.get(`https://api.eve-yemek.com/restaurants/${id}`)
        return data;
    }

    async getRestaurantOwners(){
        const {data} = await axios.get('https://api.eve-yemek.com/users?fields=roles&text=restaurant_owner');
        return data
    }

    async createRestaurant(restaurantCreate){
        const {data} = await axios.post(`https://api.eve-yemek.com/restaurants/`,{...restaurantCreate});
        return data;
    }

    async updateRestaurant(id,restaurantUpdate){
        const {data} = await axios.put(`https://api.eve-yemek.com/restaurants/${id}`,{...restaurantUpdate});
        return data;
            }
    }
