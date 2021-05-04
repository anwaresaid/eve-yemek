import axios from "../../helpers/_axios";

// const RestaurantsService = function () {
//     //const STORAGE_KEY = 'user_storage_key';
  
//     // const getAllRestaurants = async () => {
//     //   return axios.get("https://dev.eve-yemek.com/foods?offset=0&limit=2")
//     //     .then(res=>{
//     //         return res.data;
//     //     })
//     //     .catch(err=>{
//     //         console.log(err);
//     //         return { error:true }
//     //     })
//     // };
  
//     // return Object.freeze({
//     //     getAllRestaurants
//     // });
//   };
  
//   export default RestaurantsService();

export default class RestaurantsService {

    getRestaurants() {
        return axios.get('https://dev.eve-yemek.com/restaurants')
                .then(res => res.data);
    }
}