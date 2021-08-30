import MealDataInput from "../../../components/DataInputForms/MealDataInput/MealDataInput";
import { useRouter } from "next/router";
import BackBtn from "../../../components/backBtn";
import auth from '../../../helpers/core/auth';

export const CreateFood = () => {
    const router = useRouter();

    return auth.user.roles=='admin'|| auth.user.roles=='super_admin'&&<>
     <BackBtn router={router}/>
    <MealDataInput creating></MealDataInput></>
 
}

export default (CreateFood);
