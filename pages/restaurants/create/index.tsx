import BackBtn from "../../../components/backBtn"
import RestaurantDataInput from "../../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput"
import {useRouter} from 'next/router';
import auth from '../../../helpers/core/auth';

const CreateRestaurant = () => {

    const router = useRouter();
    return  <>{auth.user.roles=='admin'|| auth.user.roles=='super_admin'?<> <BackBtn router={router}/> <RestaurantDataInput creating></RestaurantDataInput></>:<></>}</>
}

export default CreateRestaurant;