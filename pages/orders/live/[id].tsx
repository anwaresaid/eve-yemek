import React, { useState,useEffect } from "react";
import OrdersTable from "../../../components/tables/ordersTable"
import { listOrders } from "../../../store/actions/orders.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';
import CardData from "../../../components/ordersCard/cardData";
import DropDown from "../../../components/editData/dropDown";
import { TabView, TabPanel } from 'primereact/tabview';

const liveOrder = () => {
    useEffect( () => {
     }, []);

    return (
        <div className="tabview-demo">
            <CardData/>
        </div>
    );
}

export default liveOrder;