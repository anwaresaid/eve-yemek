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
    getRestaurant(id){
        return axios.get('https://dev.eve-yemek.com/restaurants/'+ id)
        .then(res => res.data)
    }
    getCategory(id){
        return axios.get('https://dev.eve-yemek.com/category/'+ id)
        .then(res => res.data)
    }
}