import axios from "../../helpers/_axios";

export default class FoodsService {
    async getAllFoods(offset, limit, fields = null, text = null) {
        var query
        if (!fields || fields == '' || !text || text == '') {
            query = '/foods?offset=' + offset + '&limit=' + limit
        } else {
            query = '/foods?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
        }
        const { data: { data } } = await axios.get(query)
        return data;
    }

    async getFoodByRestaurant(id) {
        const { data: { data } } = await axios.get(`/foods/byrestaurant/${id}`);
        return data;
    }

    async createFood(
        name: string,
        description: string,
        image: string,
        price: number,
        currency_type: string,
        discount_price: number,
        restaurant_id: string,
        food_category_id: string,
        add_on_id: string,
        is_veg: boolean,
        featured: boolean,
        active: boolean,
        add_on_categories,
        variants) {
        const { data: { data } } = await axios.post('/foods', {
            name,
            description,
            image,
            price,
            currency_type,
            discount_price,
            restaurant_id,
            food_category_id,
            add_on_id,
            is_veg,
            featured,
            active,
            add_on_categories,
            variants
        })
        return data
    }

    async updateFood(id, foodUpdated) {
        const { data: { data } } = await axios.put(`/foods/${id}`, { ...foodUpdated })
        return data
    }

    async findFood(id) {
        const { data: { data } } = await axios.get(`/foods/${id}`)
        return data
    }
}