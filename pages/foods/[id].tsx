import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import MealDataInput from "../../components/DataInputForms/MealDataInput/MealDataInput"
import Loading from "../../components/Loading";
import { getIdQuery } from "../../helpers/getIdQuery";
import { findFood } from "../../store/actions/foods.action";

const UpdateFood = () => {

    const id = getIdQuery();

    const dispatch = useDispatch();
    const router = useRouter();
    
    const resFood = useSelector((state: RootState) => state.findFood);
    const { loading: foodLoading, success: foodSuccess, food: foodData } = resFood;

    useEffect(() => {
        if (!foodSuccess || id !== foodData?.id) {
            dispatch(findFood(router.query.id));
        }
    }, [foodSuccess])

    return foodLoading ? <ProgressSpinner/> : <MealDataInput updating meal={foodData}></MealDataInput>
}

export default UpdateFood