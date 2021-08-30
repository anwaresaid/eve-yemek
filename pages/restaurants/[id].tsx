import BackBtn from "../../components/backBtn";
import RestaurantDataInput from "../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput";
import Loading from "../../components/Loading";
import { getIdQuery } from "../../helpers/getIdQuery";
import {useRouter} from 'next/router';
import auth from '../../helpers/core/auth';

const UpdateRestaurants = () => {

    const router = useRouter();
    const id = getIdQuery();

    return (
        id ?auth.user.roles=='admin'|| auth.user.roles=='super_admin'&& <><BackBtn router={router}/>  <RestaurantDataInput id={id} updating ></RestaurantDataInput></>: <Loading/>
    )
    
}

export default UpdateRestaurants;
