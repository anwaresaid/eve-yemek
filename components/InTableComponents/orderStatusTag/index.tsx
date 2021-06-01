import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";

const OrderStatus = (status:number) => {
    var severity, value
    switch (status){
        case 1: 
            severity = "secondary"
            value = "Sipariş Verildi"
            break
        case 2:
            severity = "primary"
            value = "Sipariş Kabul Edildi"
            break
        case 3:
            severity = "info"
            value = "Sipariş Hazırlandı"
            break
        case 4: 
            severity = "warning"
            value = "Yolda"
            break
        case 5:
            severity = "success"
            value = "Teslim Edildi"
            break
        case 6: 
            severity = "danger"
            value = "İptal Edildi"
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