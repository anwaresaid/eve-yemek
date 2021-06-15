import axios from "../../helpers/_axios";

export default class RestaurantsService {

    async getRestaurants() {
        const { data } = await axios.get('/restaurants')
        return data;
    }

    async findRestaurant(id) {
        const { data } = await axios.get(`/restaurants/${id}`)
        return data;
    }

    async getRestaurantOwners() {
        const { data } = await axios.get('/users?fields=roles&text=restaurant_owner');
        return data
    }

    async createRestaurant(restaurantCreate) {
        const { data } = await axios.post(`/restaurants/`, { ...restaurantCreate });
        return data;
    }

    async updateRestaurant(id, restaurantUpdate) {
        const { data } = await axios.put(`/restaurants/${id}`, { ...restaurantUpdate });
        return data;
    }

    async listOwnedRestaurants() {
        const { data } = await axios.get(`/restaurants/own`);
        return data;
    }
}
