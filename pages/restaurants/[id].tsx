import router from "next/router";
import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";

const UpdateRestaurants = () => {
    

    return (
        <RestaurantDataInput id={router.query.id} updating ></RestaurantDataInput>
    )
    
}

export default UpdateRestaurants;
