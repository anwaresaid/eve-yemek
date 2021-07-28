import BackBtn from "../../../components/backBtn"
import RestaurantDataInput from "../../../components/DataInputForms/RestaurantDataInput/RestaurantDataInput"
import {useRouter} from 'next/router';

const CreateRestaurant = () => {

    const router = useRouter();
    return <> <BackBtn router={router}/> <RestaurantDataInput creating></RestaurantDataInput></>
}

export default CreateRestaurant;