import React, { useState, useEffect } from 'react';

import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDate from "./cardDate";
import OrderDivider from "./orderDivider";
import OrderStatus from '../InTableComponents/orderStatusTag';



const OrdersCard = (props) => {

    console.log(props)
    
    return (
        <div id='ordersDiv'>
            <h1 id='ordersHeader'>Sipariş {props.id}</h1>
            {props.orderData && props.userData&& props.restaurantData&&<>
                <Card id='ordersCard' title="Alpuğan - Elçiboğa">
                    <div className="p-grid">
                        <div id='detailsDiv' className="p-col">
                            <div id='nameDiv' className="p-pb-2">Kimden</div>
                            <div id='addressDiv'><b>{ props.userData.addresses[0]?.full_address}</b></div>
                            <div>{}</div>
                            <div id='phoneDiv'>Telefon: { props.userData.phone}</div>
                            <div id='emailDiv'>E-Posta: { props.userData.email}</div>
                        </div>
                        <div id='resInfoDiv' className="p-col">
                            <div id='nameDiv' className="p-pb-2">Kime</div>
                            <div id='nameInputDiv'><b>{ props.restaurantData.name}</b></div>
                            <div id='addressDiv'>{props.restaurantData.address.full_address}</div>
                            <div id='phoneDiv'>Telefon: { props.restaurantData.phone}</div>
                            <div id='emailDiv'>E-Posta: { props.restaurantData.email}</div>
                        </div>
                        <div id='recieptDiv' className="p-col">
                            <div id='reciepIdtDiv'><b>Fatura:#04-29-934F2449-D88C</b></div>
                            <div id='recieptDateDiv'><b>2021-04-29 10:26:45</b></div>
                            <br/>
                            <div id='orderIdDiv'><b>Sipariş ID: </b>{props.orderData.id}</div>
                            <div id='createdAtDiv'><b>Sipariş Verildi: </b><CardDate date = {props.orderData.createdAt}/></div>
                            {OrderStatus(props.orderData.status_id ?? 1)}
                        </div>
                    </div>

                    <DataTable id='dataTable' resizableColumns columnResizeMode="fit" className="p-datatable-striped">
                        <Column field="name" header="Yemek Adı" style={{width:'50%'}}></Column>
                        <Column field="price" header="Tane Fiyatı"></Column>
                        <Column field="" header="Adet"></Column>
                        <Column field="" header="Ara Toplam"></Column>
                    </DataTable>

                    <div className="p-grid">
                        <div id='dividerDiv' className="p-col">
                            <OrderDivider id='orderDivider' label ="Ödeme Yöntemi:" value = {props.orderData.payment_type}/>
                        </div>
                        <div id='orderDetailsDiv' className="p-col-5">
                            <div>
                                <OrderDivider id='restaurantAmount' label ="Ara Toplam:" value = {props.orderData.restaurant_amount}/>
                                <OrderDivider id='tax' label ="Vergi (0%)" value = {props.orderData.tax}/>
                                <OrderDivider id='deliveryAmount' label ="Kargo Ücreti:" value = {props.orderData.delivery_amount}/>
                                <OrderDivider id='discountCoupon' label ="Kupon İndirimi (-):" value = {props.orderData.coupon_discount}/>
                                <OrderDivider id='totalAmount' label ="Toplam(-):" value = {props.orderData.total_amount}/>
                            </div>
                        </div>
                    </div>
                </Card>
            </>}
        </div>
        
    )
}

export default OrdersCard