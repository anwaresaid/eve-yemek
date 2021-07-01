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
import { detailedDate, fromNowDate, momentSetLocale } from '../../helpers/dateFunctions';

const CardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let toast = useRef(null)
    const res = useSelector((state: RootState) => state.findOrder);
    const { loading: orderLoading, success: orderSuccess, orderData } = res;

    useEffect(() => {
        if (!router.isReady) return;
        if (!orderData || router.query.id !== orderData.order) {
            dispatch(findOrder(router.query.id));
            momentSetLocale();
        }
    }, [dispatch, router.isReady])

    const priceTag = (price) => {
        return price + ' ' + orderData.currency_type
    }

    const mealTableColumns = [
        {field: 'name', header: i18n.t('name')},
        {header: i18n.t('price'), body: (row) => priceTag(row.price)},
        {field: 'quantity', header: i18n.t('quantity')},
        {header: i18n.t('total'), body: (row) => priceTag(row.quantity * row.price)}
    ].map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable />;
    });

    const OrderDetailCard = () => {

        return (
            <div id='ordersDiv'>
                {orderData &&
                    <>
                        <Card id='ordersCard' title={orderData.user?.name}>
                            <div className="p-grid">
                                {
                                    orderData.user &&
                                    <div id='detailsDiv' className="p-col">
                                        <div id='fromDiv' className="p-pb-2">{i18n.t('from')}</div>
                                        <div id='nameDiv'><b>{orderData.user.name}</b></div>
                                        <div id='addressDiv'><b>{orderData.user.address}</b></div>
                                        <div id='phoneDiv'>{i18n.t('telephone')}: {orderData.user.phone}</div>
                                        <div id='emailDiv'>{i18n.t('email')}: {orderData.user.email}</div>
                                    </div>
                                }
                      
                                {
                                    orderData.restaurant &&
                                    <div id='resInfoDiv' className="p-col">
                                        <div id='toDiv' className="p-pb-2">{i18n.t('to')}</div>
                                        <div id='nameDiv'><b>{orderData.restaurant.name}</b></div>
                                        <div id='addressDiv'>{orderData.restaurant.address.full_address}</div>
                                        <div id='phoneDiv'>{i18n.t('telephone')}: {orderData.restaurant.phone}</div>
                                        <div id='emailDiv'>{i18n.t('email')}: {orderData.restaurant.email}</div>
                                    </div>
                                }

                                <div id='recieptDiv' className="p-col">
                                    <div id='reciepIdtDiv'><b>{i18n.t('receipt')}:</b> {orderData.unique_id}</div>
                                    <div id='orderTimeDiv'><b>{i18n.t('orderTime')}:</b> {detailedDate(orderData.createdAt)}</div>
                                    <br />
                                    <div id='orderIdDiv'><b>{i18n.t('order')} ID: </b>{orderData.order}</div>
                                    <div id='createdAtDiv'><b>{i18n.t('orderPlaced')}: </b>{fromNowDate(orderData.createdAt)}</div><br/>
                                    <div id='orderStatusDiv'><b>{i18n.t('orderStatus')}: </b>{OrderStatus(orderData.status, orderData.delivery_status)}</div><br/>
                                </div>
                            </div>

                            <DataTable id='mealTable' resizableColumns columnResizeMode="fit" className="p-datatable-striped" value={orderData.dishes}>
                               {mealTableColumns}
                            </DataTable>

                            <div className="p-grid">
                                <div id='dividerDiv' className="p-col">
                                    <OrderDivider id='orderDivider' label={i18n.t('paymentGateway')} value={orderData.payment_type} />
                                </div>
                                <div id='orderDetailsDiv' className="p-col-5">
                                    <div>
                                        <OrderDivider id='totalFoodAmount' label={i18n.t('total') + ':'} value={priceTag(orderData.total_amount - orderData.delivery_charge - orderData.tax - orderData.coupon_discount - orderData.restaurant_charges)} />
                                        <OrderDivider id='deliveryAmount' label={i18n.t('restaurantFee')} value={priceTag(orderData.restaurant_charges)} />
                                        <OrderDivider id='tax' label={i18n.t('VAT') + '(%)'} value={priceTag(orderData.tax)} />
                                        <OrderDivider id='deliveryAmount' label={i18n.t('deliveryFee')} value={priceTag(orderData.delivery_charge)} />
                                        <OrderDivider id='discountCoupon' label={i18n.t('discountCoupon') + "(-):"} value={priceTag(orderData.coupon_discount)} />
                                        <OrderDivider id='totalAmount' label={i18n.t('total') + "(-):"} value={priceTag(orderData.total_amount)} />
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
                <TabPanel header={i18n.t('orderDetail')}>
                    {orderLoading && <ProgressSpinner></ProgressSpinner>}
                    {orderSuccess && OrderDetailCard()}
                </TabPanel>
                <TabPanel header={i18n.t('updateOrderStatus')}>
                    <EditDate
                        orderData={orderData}
                    />
                </TabPanel>
            </TabView>
            }
        </>

    )
}

export default CardData;