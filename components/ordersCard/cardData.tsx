import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { findOrder } from "../../store/actions/orders.action";
import { getSingleUser } from "../../store/actions/userslists.action";
import { findRestaurant } from "../../store/actions/restaurant.action";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "typesafe-actions";
import OrdersCard from "./card";
import EditDate from '../editOrders/editOrders';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';





const cardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [orderID, setOrderID] = useState(router.query.id);

    const res = useSelector((state: RootState) => state.findOrder);
    const { loading, success, order } = res;
    const resUser = useSelector((state: RootState) => state.singleUser);
    const { loading: userLoading, success: userSuccess, userData } = resUser;
    const resRestaurant = useSelector((state: RootState) => state.findRestaurant);
    const { loading: restaurantLoading, success: restaurantSuccess, restaurant } = resRestaurant;

    useEffect(() => {
        if (router.query.id){
            if (!order || router.query.id !== order.id) {
                dispatch(findOrder(router.query.id));
            }
        }
    }, [dispatch, router.query.id])

    useEffect(() => {
        if (order?.restaurant?.id) {
            dispatch(getSingleUser("60cdb95dcd8dc29322218381"));
            dispatch(findRestaurant(order.restaurant.id));
        }

    }, [success])

    if (loading || userLoading || restaurantLoading)
        return <ProgressSpinner></ProgressSpinner>

    return (
        <>
            { order && userSuccess && restaurantSuccess &&
                <TabView id="tabView">
                    <TabPanel header="Siparis Detayi">
                        <OrdersCard
                            orderData={order}
                            id={router.query.id}
                            userData={userData}
                            restaurantData={restaurant}
                        />
                    </TabPanel>
                    <TabPanel header="Siparis Durumunu Guncelle">
                        <EditDate
                            order={order}
                        />
                    </TabPanel>
                </TabView>
            }
        </>

    )
}

export default cardData;