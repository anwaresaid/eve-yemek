import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import { i18n } from "../../language";

const AddressOfRestaurant = ({comingResData}) => {

    return (
        <>
            {comingResData ? <div>
                <h4>{i18n.t("fullAddress")}</h4>
                <p>{comingResData?.address?.full_address}</p>
                <h4>{i18n.t("googleMaps")}</h4>
                <iframe width="700" height="350" frameBorder={0}
                src={`https://www.google.com/maps/embed/v1/place?q=${comingResData?.address?.latitude},${comingResData?.address?.longitude}&key=AIzaSyBfarreOm4O5Hn90DQMBbFwzu-_QVwdowE`}>
                    
                </iframe>
            </div>
            : <ProgressSpinner/>
            }
        </>
    );
}

export default AddressOfRestaurant;