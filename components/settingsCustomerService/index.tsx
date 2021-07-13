import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { i18n } from "../../language";
import PasswordChangePage from "../settingsOwner/passwordChangePage";

const SettingsCustomerService = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={i18n.t("security")} >
                    <PasswordChangePage />
                </TabPanel>
            </TabView>
        </>
    );
};

export default SettingsCustomerService;
