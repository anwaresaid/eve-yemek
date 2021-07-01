import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { i18n } from "../../../language";

const OrderStatus = (orderStatus, deliveryStatus) => {
    var severity, value
    switch (orderStatus){
        case 'placed': 
            severity = "secondary"
            value = i18n.t('orderPlaced')
            break
        case 'accepted':
            severity = "primary"
            value = i18n.t('orderAccepted')
            break
        case 'prepared':
            severity = "info"
            value = i18n.t('orderPrepared')
            break
        case 'canceled': 
            severity = "danger"
            value = i18n.t('cancelled')
            break
        default:
            return <div></div>
    }

    switch(deliveryStatus){
        case 'on-the-way': 
            severity = "warning"
            value = i18n.t('onTheWay')
            break
        case 'delivered':
            severity = "success"
            value = i18n.t('delivered')
            break
        case 'canceled': 
            severity = "danger"
            value = i18n.t('cancelled')
            break
    }

    return(
        <span id='statusTag'>
           <Tag className="p-mr-2" value={value} severity={severity}></Tag>
        </span>
    )
}

export default OrderStatus;