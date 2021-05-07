import React, { useState, useEffect } from 'react';
import OrdersService from "../../store/services/orders.service";
import { useRouter } from 'next/router';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from 'primereact/divider';

const Order = () => {

    const router = useRouter();
    const [firstRun, setFirstRun]= useState(false);
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState({});
    const ordersService = new OrdersService();
    
    useEffect(()=>{
        setFirstRun(true);
        if(typeof router.query?.id === "string"){
            console.log("Setted Id");
           setOrderId(router.query.id);
        }else{
            if(firstRun !== false)
                router.push("/orders");
        }
    }, [router.query.id]);

    useEffect(()=>{
        if(orderId){
            ordersService.getOrder(orderId).then(data => setOrder(data));
        }
    },[orderId]);

    const exampleFoodsData = [
        {
            "featured": true,
            "active": true,
            "is_deleted": false,
            "_id": "608b26fee7e283c02975b0a2",
            "restaurant_id": "608b25f6e7e283c02975b09a",
            "food_category_id": "608b2637e7e283c02975b09b",
            "name": "Generic Fresh Chicken",
            "description": "test description",
            "image": "http://placeimg.com/640/480",
            "price": 59,
            "discount_price": 49,
            "is_veg": false,
            "create_user_id": "608b258be7e283c02975b095",
            "createdAt": "2021-04-29T21:37:02.821Z",
            "updatedAt": "2021-04-29T21:37:02.821Z",
            "__v": 0
        },
        {
            "featured": true,
            "active": true,
            "is_deleted": false,
            "_id": "608c0f89d024f934af94db09",
            "restaurant_id": "608c0f56d024f934af94db02",
            "food_category_id": "608c0f7cd024f934af94db03",
            "name": "Sleek Fresh Table",
            "description": "test description",
            "image": "http://placeimg.com/640/480",
            "price": 59,
            "discount_price": 49,
            "is_veg": false,
            "create_user_id": "608bb0ddb52c092fc8af6762",
            "createdAt": "2021-04-30T14:09:13.389Z",
            "updatedAt": "2021-04-30T14:09:13.389Z",
            "__v": 0
        },
        {
            "featured": true,
            "active": true,
            "is_deleted": false,
            "_id": "608c0f89d024f934af94db09",
            "restaurant_id": "608c0f56d024f934af94db02",
            "food_category_id": "608c0f7cd024f934af94db03",
            "name": "Sleek Fresh Table",
            "description": "test description",
            "image": "http://placeimg.com/640/480",
            "price": 49,
            "discount_price": 49,
            "is_veg": false,
            "create_user_id": "608bb0ddb52c092fc8af6762",
            "createdAt": "2021-04-30T14:09:13.389Z",
            "updatedAt": "2021-04-30T14:09:13.389Z",
            "__v": 0
        }
    ];

    return (
        <>
            <h1>Sipariş Detayları</h1>
            {order && <>
                <Card title="Alpuğan - Elçiboğa">
                    <div className="p-grid">
                        <div className="p-col">
                            <div className="p-pb-2">Kimden</div>
                            <div><b>Mia</b></div>
                            <div>Şirinevler, Mahmutbey 10. Sokağı 37a, 34188 Bahçelievler/İstanbul</div>
                            <div>Telefon: 9055056003</div>
                            <div>E-Posta: example@eve-yemek.com</div>
                        </div>
                        <div className="p-col">
                            <div className="p-pb-2">Kime</div>
                            <div><b>Alpuğan - Elçiboğa</b></div>
                            <div>7013 Baçman Lodge</div>
                            <div>Telefon: 906828101933</div>
                            <div>E-Posta: Baatursepi_Pakst86@hotmail.com</div>
                        </div>
                        <div className="p-col">
                            <div><b>Fatura:#04-29-934F2449-D88C</b></div>
                            <div><b>2021-04-29 10:26:45</b></div>
                            <br/>
                            <div><b>Sipariş ID: </b>479</div>
                            <div><b>Sipariş Verildi: </b>1 hafta önce</div>
                            <div><b>Durum: </b><Tag value="Teslim Edildi" severity="success"/></div>
                        </div>
                    </div>

                    <DataTable value={exampleFoodsData} resizableColumns columnResizeMode="fit" className="p-datatable-striped">
                        <Column field="name" header="Yemek Adı" style={{width:'50%'}}></Column>
                        <Column field="price" header="Tane Fiyatı"></Column>
                        <Column field="" header="Adet"></Column>
                        <Column field="" header="Ara Toplam"></Column>
                    </DataTable>

                    <div className="p-grid">
                        <div className="p-col">
                            
                        </div>
                        <div className="p-col-5">
                            <div>
                                <div>
                                    <Divider/>
                                    <div className="p-grid">
                                        <b className="p-col">Vergi(0%):</b>
                                        <div className="p-col">
                                            ₺75
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Divider/>
                                    <div className="p-grid">
                                        <b className="p-col">Vergi(0%):</b>
                                        <div className="p-col">
                                            ₺75
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Divider/>
                                    <div className="p-grid">
                                        <b className="p-col">Katgo Ücreti::</b>
                                        <div className="p-col">
                                            ₺40
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Divider/>
                                    <div className="p-grid">
                                        <b className="p-col">Kupon İndirimi (-):</b>
                                        <div className="p-col">
                                            ₺12
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Divider/>
                                    <div className="p-grid">
                                        <b className="p-col">Toplam(-):</b>
                                        <div className="p-col">
                                            ₺50
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </>}
        </>
    );
}

export default Order;
