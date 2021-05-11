import axios from "../../helpers/_axios";

export default class RestaurantsService {

    getRestaurants() {
        return axios.get('https://dev.eve-yemek.com/restaurants')
                .then(res => res.data);
    }

    async getRestaurantOwners(){
        const {data} = await axios.get('https://dev.eve-yemek.com/users?fields=roles&text=restaurant_owner');
        return data
    }

    async updateRestaurant(restaurant_ID){
        const {data} = await axios.get(`https://dev.eve-yemek.com/restaurants/${restaurant_ID}`);
        return data;
    }
}