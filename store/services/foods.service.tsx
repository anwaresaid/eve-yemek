import axios from "../../helpers/_axios";

//Example

// const FoodsService = function () {
//     //const STORAGE_KEY = 'user_storage_key';
  
//     const getAllFoods = async () => {
//       return axios.get("https://dev.eve-yemek.com/foods?offset=0&limit=2")
//         .then(res=>{
//             return res.data;
//         })
//         .catch(err=>{
//             console.log(err);
//             return { error:true }
//         })
//     };
  
//     return Object.freeze({
//         getAllFoods
//     });
//   };
  
//   export default FoodsService();

export default class FoodsService{
    getFoods() {
        return axios.get('https://dev.eve-yemek.com/foods')
                .then(res => res.data);
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
}