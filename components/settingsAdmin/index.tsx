
import React, { useEffect, useRef, useState } from "react";
import { i18n } from "../../language";
import { TabPanel, TabView } from "primereact/tabview";
import General from "./general";
import PasswordChangePage from "../settingsOwner/passwordChangePage";
import Notification from "./notifications";
import SmsGateWay from "./smsGateWay";
import GoogleMaps from "./googleMaps";
import PaymentGateway from "./paymentGateway";

const SettingsAdmin = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div id="settingsRenderDiv">
                    <TabView
                        id="tabPanelSettings"
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel header={i18n.t("general")}>
                            <General/>
                        </TabPanel>
                        <TabPanel header={i18n.t("notifications")}>
                            <Notification/>
                        </TabPanel>
                        <TabPanel header={i18n.t("smsGateway")}>    
                            <SmsGateWay/>
                        </TabPanel>
                        <TabPanel header={i18n.t("googleMaps")}>
                            <GoogleMaps/>
                        </TabPanel>
                        <TabPanel header={i18n.t("paymentGateway")}>
                            <PaymentGateway/>
                        </TabPanel>
                        <TabPanel header={i18n.t("security")} >
                            <PasswordChangePage />
                        </TabPanel>
                    </TabView>
        </div>
    );
};

export default SettingsAdmin;
