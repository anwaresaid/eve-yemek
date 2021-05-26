import React, { useState,useEffect } from "react";
import OrdersTable from "../../../components/tables/ordersTable"
import { listOrders } from "../../../store/actions/orders.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';

const liveOrdersList = () => {


    const [ordersItems, setOrdersItems] = useState([]);
    const [liveOrders, setLiveOrders] = useState();
    
    const dispatch = useDispatch();

    const res = useSelector((state:RootState) => state.listOrders);
    const {loading, success, orders} = res;

    useEffect( () => {

        if(!orders)
            dispatch(listOrders());
    
     }, [dispatch]);

    useEffect(() => {
        if(success)
        setOrdersItems(orders.items);
        //to filter the live orders
        // if(orders)
        // {
        //     setLiveOrders(()=>{
        //         let live= orders.items.filter(data  => {return data.status.localeCompare("Teslim Edildi")==0;});
        //         return live;
        //  })
        // }
    }, [success])

     
    return (
        <div>
            {!loading && <OrdersTable orders={ordersItems} role="restaurant_owner"></OrdersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    );
}

export default liveOrdersList;