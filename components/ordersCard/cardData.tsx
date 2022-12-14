import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { findOrder } from "../../store/actions/orders.action";
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
import ReactToPrint from 'react-to-print';
import { Button } from 'primereact/button';

type FoodType = {
    name:string,
    image:string,
    price:number,
    quantity:number,
    variants:VariantsType,
    addons:AddonType[]
}

type AddonType = {
    name:string,
    price:number
}

type VariantsType = {
    name:string,
    price:number
}

const CardData = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let toast = useRef(null);
    const printReceipt = useRef();
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

    const addonsList = (addons:AddonType[]) => {
        if(addons?.length > 0){
            return addons.map((addon, index) => {
                return <small key={index}>{addon?.name + (addons.length > index + 1 ? ', ' : " ")}</small>
            });
        }
    }

    const productVariantsList = (variants:VariantsType) => {
        return <small title={i18n.t("variants")} className="p-pb-1">{variants?.name}</small>
    }

    const calcFoodPrice = (food:FoodType) => {
        let total_price = food.price;

        //Calculate addon prices
        if(food?.addons){
            if(food.addons.length > 0){
                food.addons.map((addon, index)=>{
                    if(addon?.price > 0){
                        total_price += addon.price;
                    }
                });
            }
        }

        //Calculate variants prices
        if(food?.variants){
            if(food?.variants?.price > 0){
                total_price += food.variants.price;
            }
        }

        return total_price;
    }

    const foodNameTemplate = (row:FoodType) => {
        return (<>
            <div>{row?.name}</div>
            <div>{productVariantsList(row?.variants)}</div>
            <div>{addonsList(row?.addons)}</div>
        </>)
    }

    const mealTableColumns = [
        {field: 'name', header: i18n.t('name'), body:foodNameTemplate},
        {header: i18n.t('price'), body: (food:FoodType) => priceTag(calcFoodPrice(food))},
        {field: 'quantity', header: i18n.t('quantity')},
        {header: i18n.t('total'), body: (food:FoodType) => priceTag(food.quantity * calcFoodPrice(food))}
    ].map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable />;
    });

    const OrderDetailCard = () => {

        return (
            <div id='ordersDiv'>
                {orderData &&
                    <>
                        <Card ref={printReceipt} id='ordersCard' title={orderData.user?.name}>
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
                                    <div id='orderStatusDiv'><b>{i18n.t('orderStatus')}: </b>{OrderStatus(orderData.status)}</div><br/>
                                </div>
                            </div>

                            <DataTable id='mealTable' resizableColumns columnResizeMode="fit" className="p-datatable-striped" value={orderData.dishes}>
                               {mealTableColumns}
                            </DataTable>

                            <div className="p-grid">
                                <div id='dividerDiv' className="p-col">
                                    <OrderDivider id='orderDivider' label={i18n.t('paymentGateway')} value={orderData.payment_type} />
                                    <OrderDivider id='notes' label={i18n.t('notes')} value={orderData.notes} />
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
                        <div>
                            <ReactToPrint
                                trigger={() => <Button icon="pi pi-print" label={i18n.t('print')} />}
                                content={() => printReceipt.current}
                            />
                        </div>
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