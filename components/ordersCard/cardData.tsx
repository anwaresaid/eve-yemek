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

    const res = useSelector((state: RootState) => state.listOrders);
    const { orderToEdit } = res;

    const resUser = useSelector((state: RootState) => state.singleUser);
    const { loading: userLoading, success: userSuccess, userData } = resUser;
    const resRestaurant = useSelector((state: RootState) => state.findRestaurant);
    const { loading: restaurantLoading, success: restaurantSuccess, restaurant } = resRestaurant;

    useEffect(() => {
        if (router.query.id) {
            if (!orderToEdit || router.query.id !== orderToEdit.id) {
                dispatch(findOrder(router.query.id));
            }
        }
    }, [dispatch, router.query.id])

    useEffect(() => {
        if (orderToEdit?.restaurant?.id) {
            dispatch(getSingleUser("60cdb95dcd8dc29322218381"));
            dispatch(findRestaurant(orderToEdit.restaurant.id));
        }

    }, [orderToEdit])

    if (userLoading || restaurantLoading)
        return <ProgressSpinner></ProgressSpinner>

    return (
        <>
            { orderToEdit && userSuccess && restaurantSuccess &&
                <TabView id="tabView">
                    <TabPanel header="Siparis Detayi">
                        <OrdersCard
                            orderData={orderToEdit}
                            id={router.query.id}
                            userData={userData}
                            restaurantData={restaurant}
                        />
                    </TabPanel>
                    <TabPanel header="Siparis Durumunu Guncelle">
                        <EditDate
                            order={orderToEdit}
                        />
                    </TabPanel>
                </TabView>
            }
        </>

    )
}

export default cardData;