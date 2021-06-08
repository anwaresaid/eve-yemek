import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { i18n } from "../../../language";

const OrderStatus = (status:number) => {
    var severity, value
    switch (status){
        case 1: 
            severity = "secondary"
            value = i18n.t('orderPlaced')
            break
        case 2:
            severity = "primary"
            value = i18n.t('orderAccepted')
            break
        case 3:
            severity = "info"
            value = i18n.t('orderPrepared')
            break
        case 4: 
            severity = "warning"
            value = i18n.t('onTheWay')
            break
        case 5:
            severity = "success"
            value = i18n.t('delivered')
            break
        case 6: 
            severity = "danger"
            value = i18n.t('cancelled')
            break
        default:
            return <div></div>
    }

    return(
        <div>
           <Tag className="p-mr-2" value={value} severity={severity}></Tag>
        </div>
    )
}

export default OrderStatus;