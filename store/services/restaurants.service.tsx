import axios from "../../helpers/_axios";

export default class RestaurantsService {

    async getRestaurants(offset, limit) {
        const { data:{data} } = await axios.get('/restaurants?offset='+offset+'&limit='+limit)
        return data;
    }

    async findRestaurant(id) {
        const { data:{data} } = await axios.get(`/restaurants/${id}`)
        return data;
    }

    async getRestaurantOwners() {
        const { data:{data} } = await axios.get('/users?fields=roles&text=restaurant_owner');
        return data
    }

    async createRestaurant(restaurantCreate) {
        const { data:{data} } = await axios.post(`/restaurants/`, { ...restaurantCreate });
        return data;
    }

    async updateRestaurant(id, restaurantUpdate) {
        const { data:{data} } = await axios.put(`/restaurants/${id}`, { ...restaurantUpdate });
        return data;
    }

    async listOwnedRestaurants() {
        const { data:{data} } = await axios.get(`/restaurants`);
        return data;
    }

    async openCloseOwnedRestaurant(restaurantID, statusBody){
        const { data:{data} } = await axios.put('/restaurants/' + restaurantID + '/change-status', statusBody);
        return data;
    }
}
