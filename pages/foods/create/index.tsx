import MealDataInput from "../../../components/DataInputForms/MealDataInput/MealDataInput";
import { useRouter } from "next/router";
import BackBtn from "../../../components/backBtn";

export const CreateFood = () => {
    const router = useRouter();

    return <>
     <BackBtn router={router}/>
    <MealDataInput creating></MealDataInput></>
 
}

export default (CreateFood);
