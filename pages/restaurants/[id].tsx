import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";
import Loading from "../../components/Loading";
import { getIdQuery } from "../../helpers/getIdQuery";

const UpdateRestaurants = () => {

    const id = getIdQuery();

    return (
        id ? <RestaurantDataInput id={id} updating ></RestaurantDataInput> : <Loading/>
    )
    
}

export default UpdateRestaurants;
