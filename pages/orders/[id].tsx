import React, { useState, useEffect } from 'react';
import BackBtn from '../../components/backBtn';
import CardData from "../../components/ordersCard/cardData";
import {useRouter} from 'next/router'

const Order = () => {

    const router = useRouter();
    return (
        <div className="tabview-demo">
            <BackBtn router={router}/>
            <CardData/>
        </div>
    );
}

export default Order;
