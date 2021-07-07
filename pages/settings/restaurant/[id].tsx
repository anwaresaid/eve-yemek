import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import OpenHoursPage from "../../../components/settingsOwner/openHoursPage";
import { getIdQuery } from "../../../helpers/getIdQuery";
import { i18n } from "../../../language";

const RestaurantsEdit = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    
    return (
        <>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={i18n.t("workingHours")} >
                    <OpenHoursPage/>
                </TabPanel>
            </TabView>
        </>
    );

};

export default RestaurantsEdit;
