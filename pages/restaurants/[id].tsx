import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";
import { getIdQuery } from "../../helpers/getIdQuery";

const UpdateRestaurants = () => {

    const id = getIdQuery();

    return (
        id ? <RestaurantDataInput id={id} updating ></RestaurantDataInput> : ""
    )
    
}

export default UpdateRestaurants;
