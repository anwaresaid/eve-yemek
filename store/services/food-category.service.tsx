import axios from "../../helpers/_axios";

export default class FoodCategorynService{

    getFoodCategory(){
        return axios.get('https://dev.eve-yemek.com/food-categories')
        .then(res => res.data)
    }
}