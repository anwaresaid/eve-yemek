import { useRouter } from "next/router";
import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";

const UpdateRestaurants = () => {

    const router = useRouter();

    return (
        <RestaurantDataInput id={router.query.id} updating ></RestaurantDataInput>
    )
    
}

export default UpdateRestaurants;
