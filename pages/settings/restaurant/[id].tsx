import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import AddressOfRestaurant from "../../../components/settingsOwner/addressOfRestaurant";
import OpenHoursPage from "../../../components/settingsOwner/openHoursPage";
import { getIdQuery } from "../../../helpers/getIdQuery";
import { i18n } from "../../../language";
import { findRestaurant } from "../../../store/actions/restaurant.action";

const RestaurantsEdit = () => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    const dispatch = useDispatch();

    const id = getIdQuery();
    const resDetails = useSelector((state: RootState) => state.findRestaurant);
    const { loading: resLoading, success: resSuccess, restaurant } = resDetails;
    
    useEffect(()=>{
        if(id){
            dispatch(findRestaurant(id));
        }
    }, [id]);

    return (
        <>
            {resSuccess ? 
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={i18n.t("workingHours")} >
                    <OpenHoursPage comingResData={restaurant}/>
                </TabPanel>
                <TabPanel header={i18n.t("addressInformation")} >
                    <AddressOfRestaurant comingResData={restaurant}/>
                </TabPanel>
            </TabView>
            : <ProgressSpinner />}
        </>
    );

};

export default RestaurantsEdit;
