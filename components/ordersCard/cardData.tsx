import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { findOrder } from "../../store/actions/orders.action";
import { getSingleUser } from "../../store/actions/userslists.action";
import { findRestaurant } from "../../store/actions/restaurant.action";
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import OrdersCard from "./card";
import EditDate from '../editOrders/editOrders';
import { TabView, TabPanel } from 'primereact/tabview';





const cardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [orderId, setOrderId] = useState(""); 
    
    const res = useSelector((state:RootState) => state.findOrder);
    const {loading, success, order} = res;
    const resUser = useSelector((state:RootState) => state.singleUser);
    const {loading:userLoading, success:userSuccess, userData} = resUser;
    const resRestaurant = useSelector((state:RootState) => state.findRestaurant);
    const {loading:restaurantLoading, success:restaurantSuccess, restaurant} = resRestaurant;

    useEffect(() => {
        if(typeof router.query?.id === "string")
        {   
            setOrderId(router.query.id);
        }
        if(orderId){
            dispatch(findOrder(orderId));
        }
    },[router.query.id,orderId])

    useEffect(() => {
        if(order)
        {
            dispatch(getSingleUser("608b258be7e283c02975b095"));
            dispatch(findRestaurant(order.restaurant_id));
        }

    },[success])
    
    
    return (
        <>
            { order&&
            <TabView>
                <TabPanel header="Siparis Detayi">
                    <OrdersCard 
                    orderData = {order} 
                    id= {router.query.id} 
                    userData={userData} 
                    restaurantData={restaurant} 
                    />
                </TabPanel>
                    <TabPanel header="Siparis Durumunu Guncelle">
                        <EditDate
                        order = {order}
                        />
                </TabPanel>
            </TabView>
        }
        </>
        
    )
}

export default cardData;