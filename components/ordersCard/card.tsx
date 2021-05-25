import React, { useState, useEffect } from 'react';

import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDate from "./cardDate";
import OrderDivider from "./orderDivider";



const OrdersCard = (props) => {

  
    
    return (
        <>
            <h1>Sipariş {props.id}</h1>
            {props.orderData && props.userData&& props.restaurantData&&<>
                <Card title="Alpuğan - Elçiboğa">
                    <div className="p-grid">
                        <div className="p-col">
                            <div className="p-pb-2">Kimden</div>
                            <div><b>{ props.userData.address[0][0]}</b></div>
                            <div>{}</div>
                            <div>Telefon: { props.userData.phone}</div>
                            <div>E-Posta: { props.userData.email}</div>
                        </div>
                        <div className="p-col">
                            <div className="p-pb-2">Kime</div>
                            <div><b>{ props.restaurantData.name}</b></div>
                            <div>{ props.restaurantData.address}</div>
                            <div>Telefon: { props.restaurantData.phone}</div>
                            <div>E-Posta: { props.restaurantData.email}</div>
                        </div>
                        <div className="p-col">
                            <div><b>Fatura:#04-29-934F2449-D88C</b></div>
                            <div><b>2021-04-29 10:26:45</b></div>
                            <br/>
                            <div><b>Sipariş ID: </b>{props.orderData.id}</div>
                            <div><b>Sipariş Verildi: </b><CardDate date = {props.orderData.createdAt}/></div>
                            <div><b>Durum: </b><Tag value="Teslim Edildi" severity="success"/></div>
                        </div>
                    </div>

                    <DataTable resizableColumns columnResizeMode="fit" className="p-datatable-striped">
                        <Column field="name" header="Yemek Adı" style={{width:'50%'}}></Column>
                        <Column field="price" header="Tane Fiyatı"></Column>
                        <Column field="" header="Adet"></Column>
                        <Column field="" header="Ara Toplam"></Column>
                    </DataTable>

                    <div className="p-grid">
                        <div className="p-col">
                            <OrderDivider label ="Ödeme Yöntemi:" value = {props.orderData.payment_type}/>
                        </div>
                        <div className="p-col-5">
                            <div>
                                <OrderDivider label ="Ara Toplam:" value = {props.orderData.restaurant_amount}/>
                                <OrderDivider label ="Vergi (0%)" value = {props.orderData.tax}/>
                                <OrderDivider label ="Kargo Ücreti:" value = {props.orderData.delivery_amount}/>
                                <OrderDivider label ="Kupon İndirimi (-):" value = {props.orderData.coupon_discount}/>
                                <OrderDivider label ="Toplam(-):" value = {props.orderData.total_amount}/>
                            </div>
                        </div>
                    </div>
                </Card>
            </>}
        </>
        
    )
}

export default OrdersCard