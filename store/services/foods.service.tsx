import axios from "../../helpers/_axios";

export default class FoodsService{
    async getFood() {
        const {data} = await axios.get('https://dev.eve-yemek.com/foods');
        return data;
    }

    async createFood(
        name: string,
        description: string, 
        image: string, 
        price:number,
        discount_price: number,
        restaurant_id: string,
        food_category_id: string, 
        add_on_id: string,
        is_veg: boolean,
        featured: boolean,
        active: boolean){
        const {data} = await axios.post('https://dev.eve-yemek.com/foods',{
            name,
            description,
            image,
            price,
            discount_price,
            restaurant_id,
            food_category_id,
            add_on_id,
            is_veg,
            featured,
            active
        })
        return data
    }
    
    async updateFood(id,foodUpdated){
        const {data} = await axios.put(`https://dev.eve-yemek.com/foods/${id}`,{...foodUpdated})
        return data
    }

    async findFood(id){
        const {data} = await axios.get(`https://dev.eve-yemek.com/foods/${id}`)
        return data
    }
}