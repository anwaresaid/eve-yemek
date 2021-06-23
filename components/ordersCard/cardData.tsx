import React, { useState, useEffect, useRef } from 'react';
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
import { Toast } from 'primereact/toast';
import { i18n } from '../../language';

const cardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let toast = useRef(null)
    const res = useSelector((state: RootState) => state.findOrder);
    const { loading: orderLoading, success: orderSuccess, order } = res;

    const resUser = useSelector((state: RootState) => state.singleUser);
    const { loading: userLoading, success: userSuccess, userData } = resUser;
    const resRestaurant = useSelector((state: RootState) => state.findRestaurant);
    const { loading: restaurantLoading, success: restaurantSuccess, restaurant } = resRestaurant;

    useEffect(() => {
        if (!router.isReady) return;
        if (!order || router.query.id !== order.id) {
            dispatch(findOrder(router.query.id));
        }
    }, [dispatch, router.isReady])

    useEffect(() => {
        if (orderSuccess) {
            if (order?.restaurant?.id) {
                dispatch(getSingleUser("60cdb95dcd8dc29322218381"));
                dispatch(findRestaurant(order.restaurant.id));
            } else {
                toast.current.show({ severity: 'error', summary: 'Bad Data', detail: 'Data associated with this order is old/deleted' });
            }
        }
    }, [orderSuccess])

    if (userLoading || restaurantLoading)
        return <ProgressSpinner></ProgressSpinner>

    return (
        <>
            <h2>{i18n.t('order') + " " + router.query.id}</h2>
            <Toast ref={toast}></Toast>
            { orderSuccess && userSuccess && restaurantSuccess &&
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