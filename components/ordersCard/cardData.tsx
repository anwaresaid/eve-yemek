import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { findOrder } from "../../store/actions/orders.action";
import { getSingleUser } from "../../store/actions/userslists.action";
import { findRestaurant } from "../../store/actions/restaurant.action";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "typesafe-actions";
import EditDate from '../editOrders/editOrders';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { i18n } from '../../language';
import OrderDivider from "./orderDivider";
import { Card } from 'primereact/card';
import OrderStatus from '../InTableComponents/orderStatusTag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDate from "./cardDate";

const cardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let toast = useRef(null)
    const res = useSelector((state: RootState) => state.findOrder);
    const { loading: orderLoading, success: orderSuccess, orderData } = res;

    const resUser = useSelector((state: RootState) => state.singleUser);
    const { loading: userLoading, success: userSuccess, userData } = resUser;
    const resRestaurant = useSelector((state: RootState) => state.findRestaurant);
    const { loading: restaurantLoading, success: restaurantSuccess, restaurant } = resRestaurant;

    useEffect(() => {
        if (!router.isReady) return;
        if (!orderData || router.query.id !== orderData.order) {
            dispatch(findOrder(router.query.id));
        }
    }, [dispatch, router.isReady])

    useEffect(() => {
        if (orderSuccess) {
            if (orderData?.restaurant?.id) {
                dispatch(findRestaurant(orderData.restaurant.id));
            } else {
                toast.current.show({ severity: 'error', summary: 'Bad Data', detail: 'Restaurant data associated with this order is old/deleted' });
            }
            if (orderData?.user?.id) {
                dispatch(getSingleUser(orderData.user.id));
            } else {
                toast.current.show({ severity: 'error', summary: 'Bad Data', detail: 'User data associated with this order is old/deleted' });
            }
        }
    }, [orderSuccess])

    const OrderDetailCard = () => {

        return (
            <div id='ordersDiv'>
                {orderData &&
                    <>
                        <Card id='ordersCard' title={userData?.name}>
                            <div className="p-grid">
                                {userLoading &&
                                    <div className="p-col">
                                        <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} />
                                    </div>}
                                {
                                    userSuccess && userData &&
                                    <div id='detailsDiv' className="p-col">
                                        <div id='fromDiv' className="p-pb-2">{i18n.t('from')}</div>
                                        <div id='nameDiv'><b>{userData.name}</b></div>
                                        <div id='addressDiv'><b>{userData.addresses[0]?.full_address}</b></div>
                                        <div>{ }</div>
                                        <div id='phoneDiv'>{i18n.t('telephone')}: {userData.phone}</div>
                                        <div id='emailDiv'>{i18n.t('email')}: {userData.email}</div>
                                    </div>
                                }
                                {restaurantLoading &&
                                    <div className="p-col">
                                        <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} />
                                    </div>}
                                {
                                    restaurantSuccess && restaurant &&
                                    <div id='resInfoDiv' className="p-col">
                                        <div id='toDiv' className="p-pb-2">{i18n.t('to')}</div>
                                        <div id='nameDiv'><b>{restaurant.name}</b></div>
                                        <div id='addressDiv'>{restaurant.address.full_address}</div>
                                        <div id='phoneDiv'>{i18n.t('telephone')}: {restaurant.phone}</div>
                                        <div id='emailDiv'>{i18n.t('email')}: {restaurant.email}</div>
                                    </div>
                                }
                                <div id='recieptDiv' className="p-col">
                                    <div id='reciepIdtDiv'><b>{i18n.t('receipt')}:{orderData.unique_id}</b></div>
                                    <div id='recieptDateDiv'><b>{orderData.createdAt}</b></div>
                                    <br />
                                    <div id='orderIdDiv'><b>{i18n.t('order')} ID: </b>{orderData.order}</div>
                                    <div id='createdAtDiv'><b>{i18n.t('orderPlaced')}: </b><CardDate date={orderData.createdAt} /></div>
                                    {OrderStatus(orderData.status_id ?? 1)}
                                </div>
                            </div>

                            <DataTable id='dataTable' resizableColumns columnResizeMode="fit" className="p-datatable-striped">
                                <Column field="name" header={i18n.t('mealName')} style={{ width: '50%' }}></Column>
                                <Column field="price" header={i18n.t('price')}></Column>
                                <Column field="" header={i18n.t('quantity')}></Column>
                                <Column field="" header={i18n.t('total')}></Column>
                            </DataTable>

                            <div className="p-grid">
                                <div id='dividerDiv' className="p-col">
                                    <OrderDivider id='orderDivider' label={i18n.t('paymentGateway')} value={orderData.payment_type} />
                                </div>
                                <div id='orderDetailsDiv' className="p-col-5">
                                    <div>
                                        <OrderDivider id='restaurantAmount' label={i18n.t('total') + ':'} value={orderData.restaurant_amount} />
                                        <OrderDivider id='tax' label={i18n.t('VAT') + '(0%)'} value={orderData.tax} />
                                        <OrderDivider id='deliveryAmount' label={i18n.t('deliveryFee')} value={orderData.delivery_amount} />
                                        <OrderDivider id='discountCoupon' label={i18n.t('discountCoupon') + "(-):"} value={orderData.coupon_discount} />
                                        <OrderDivider id='totalAmount' label={i18n.t('total') + "(-):"} value={orderData.total_amount} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </>}
            </div>

        )
    }

    return (
        <>
            <h2>{i18n.t('order') + " " + router.query.id}</h2>
            <Toast ref={toast}></Toast>
            { <TabView id="tabView">
                <TabPanel header="Siparis Detayi">
                    {orderLoading && <ProgressSpinner></ProgressSpinner>}
                    {orderSuccess && OrderDetailCard()}
                </TabPanel>
                <TabPanel header="Siparis Durumunu Guncelle">
                    <EditDate
                        orderData={orderData}
                    />
                </TabPanel>
            </TabView>
            }
        </>

    )
}

export default cardData;