import axios from "../../helpers/_axios";

export default class FoodCategorynService{

    async getFoodCategory(){
        const {data} = await axios.get('https://dev.eve-yemek.com/food-categories');
       
        return data
    }
}