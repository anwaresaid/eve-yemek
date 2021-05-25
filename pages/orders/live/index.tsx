import React, { useState,useEffect } from "react";
import OrdersTable from "../../../components/tables/ordersTable"
import { listOrders } from "../../../store/actions/orders.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';
import OrdersCard from "../../../components/ordersCard/cardData"

const liveOrdersList = () => {

    // const [users, setUsers] = useState([]);
    const [ordersItems, setOrdersItems] = useState([]);
    // const [first1, setFirst1] = useState(0);
    const dispatch = useDispatch();
    // const res = useSelector((state:RootState) => state.listCustomers);
    // const {loading, success, customers} = res;
    const res = useSelector((state:RootState) => state.listOrders);
    const {loading, success, orders} = res;

    useEffect( () => {
        // if (!customers)
        //     dispatch(listCustomers());
        if(!orders)
            dispatch(listOrders());
     }, [dispatch]);

    useEffect(() => {
        if(success)
        setOrdersItems(orders.items);
    }, [success])

     
    return (
        <div>
            {!loading && <OrdersTable orders={ordersItems} role="restaurant_owner"></OrdersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    );
}

export default liveOrdersList;