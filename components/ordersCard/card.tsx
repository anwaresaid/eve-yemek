import React, { useState, useEffect } from 'react';

import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDate from "./cardDate";
import OrderDivider from "./orderDivider";
import OrderStatus from '../InTableComponents/orderStatusTag';
import { i18n } from '../../language';



const OrdersCard = (props) => {
    
    return (
        <div id='ordersDiv'>
            {props.orderData && props.userData&& props.restaurantData&&<>
                <Card id='ordersCard' title="Alpuğan - Elçiboğa">
                    <div className="p-grid">
                        <div id='detailsDiv' className="p-col">
                            <div id='nameDiv' className="p-pb-2">{i18n.t('from')}</div>
                            <div id='addressDiv'><b>{ props.userData.addresses[0]?.full_address}</b></div>
                            <div>{}</div>
                            <div id='phoneDiv'>{i18n.t('telephone')}: { props.userData.phone}</div>
                            <div id='emailDiv'>{i18n.t('email')}: { props.userData.email}</div>
                        </div>
                        <div id='resInfoDiv' className="p-col">
                            <div id='nameDiv' className="p-pb-2">{i18n.t('to')}</div>
                            <div id='nameInputDiv'><b>{ props.restaurantData.name}</b></div>
                            <div id='addressDiv'>{props.restaurantData.address.full_address}</div>
                            <div id='phoneDiv'>{i18n.t('telephone')}: { props.restaurantData.phone}</div>
                            <div id='emailDiv'>{i18n.t('email')}: { props.restaurantData.email}</div>
                        </div>
                        <div id='recieptDiv' className="p-col">
                            <div id='reciepIdtDiv'><b>{i18n.t('receipt')}:#04-29-934F2449-D88C</b></div>
                            <div id='recieptDateDiv'><b>2021-04-29 10:26:45</b></div>
                            <br/>
                            <div id='orderIdDiv'><b>{i18n.t('order')} ID: </b>{props.orderData.id}</div>
                            <div id='createdAtDiv'><b>{i18n.t('orderPlaced')}: </b><CardDate date = {props.orderData.createdAt}/></div>
                            {OrderStatus(props.orderData.status_id ?? 1)}
                        </div>
                    </div>

                    <DataTable id='dataTable' resizableColumns columnResizeMode="fit" className="p-datatable-striped">
                        <Column field="name" header={i18n.t('mealName')} style={{width:'50%'}}></Column>
                        <Column field="price" header={i18n.t('price')}></Column>
                        <Column field="" header={i18n.t('quantity')}></Column>
                        <Column field="" header={i18n.t('total')}></Column>
                    </DataTable>

                    <div className="p-grid">
                        <div id='dividerDiv' className="p-col">
                            <OrderDivider id='orderDivider' label ={i18n.t('paymentGateway')} value = {props.orderData.payment_type}/>
                        </div>
                        <div id='orderDetailsDiv' className="p-col-5">
                            <div>
                                <OrderDivider id='restaurantAmount' label ={i18n.t('total')+':'} value = {props.orderData.restaurant_amount}/>
                                <OrderDivider id='tax' label ={i18n.t('VAT')+ '(0%)'}  value = {props.orderData.tax}/>
                                <OrderDivider id='deliveryAmount' label ={i18n.t('deliveryFee')} value = {props.orderData.delivery_amount}/>
                                <OrderDivider id='discountCoupon' label ={i18n.t('discountCoupon')+ "(-):"} value = {props.orderData.coupon_discount}/>
                                <OrderDivider id='totalAmount' label ={i18n.t('total')+"(-):"} value = {props.orderData.total_amount}/>
                            </div>
                        </div>
                    </div>
                </Card>
            </>}
        </div>
        
    )
}

export default OrdersCard