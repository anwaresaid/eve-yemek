import BackBtn from "../../components/backBtn";
import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";
import Loading from "../../components/Loading";
import { getIdQuery } from "../../helpers/getIdQuery";
import {useRouter} from 'next/router';

const UpdateRestaurants = () => {

    const router = useRouter();
    const id = getIdQuery();

    return (
        id ?<><BackBtn router={router}/>  <RestaurantDataInput id={id} updating ></RestaurantDataInput> </>: <Loading/>
    )
    
}

export default UpdateRestaurants;
