import axios from "../../helpers/_axios";

export default class RestaurantsService {

    async getRestaurants(offset, limit, fields = null, text = null) {
        var query
        if (!fields || fields == '' || !text || text == '') {
            query = '/restaurants?offset=' + offset + '&limit=' + limit
        } else {
            query = '/restaurants?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
        }
        const { data: { data } } = await axios.get(query)
        return data;
    }

    async findRestaurant(id) {
        const { data: { data } } = await axios.get(`/restaurants/${id}`)
        return data;
    }

    async getRestaurantOwners() {
        const { data: { data } } = await axios.get('/users?fields=roles&text=restaurant_owner&offset=0&limit=9999');
        return data
    }

    async createRestaurant(restaurantCreate) {
        const { data: { data } } = await axios.post(`/restaurants/`, { ...restaurantCreate });
        return data;
    }

    async updateRestaurant(id, restaurantUpdate) {
        const { data: { data } } = await axios.put(`/restaurants/${id}`, { ...restaurantUpdate });
        return data;
    }

    async listOwnedRestaurants() {
        const { data: { data } } = await axios.get(`/restaurants`);
        return data;
    }

    async openCloseOwnedRestaurant(restaurantID, statusBody) {
        const { data: { data } } = await axios.put('/restaurants/' + restaurantID + '/change-status', statusBody);
        return data;
    }
}
