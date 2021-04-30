import axios from "axios";

const FoodsService = function () {
    //const STORAGE_KEY = 'user_storage_key';
  
    const getAllFoods = async () => {
      return axios.get("https://dev.eve-yemek.com/foods?offset=0&limit=2")
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        })
    };
  
    return Object.freeze({
        getAllFoods
    });
  };
  
  export default FoodsService();