import React, { useState, useEffect } from 'react';
import * as S from '../styles/restaurants.style'
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import OrdersService from "../store/services/orders.service";



const Orders = () => {


    const [orders, setOrders] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const ordersService = new OrdersService();
    
    useEffect(() => {
        ordersService.getOrders().then(data => setOrders(data.items));
    }, []);

    const header =(
        <div className="table-header">
            Siparişler
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label="Görüntüle" className="p-button-sm p-button-info" />
            </React.Fragment>
        );
    }

    return (
        <div>
            <div className="card">
                <h1>Siparişler</h1>
                    <S.Table value={orders} removableSort paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="{totalRecords} kayıttan {first} - {last} arasındaki kayıtlar gösteriliyor" rows={10} rowsPerPageOptions={[10,20,50]}
                    header={header} className="p-datatable-restaurants"
                    globalFilter={globalFilter} emptyMessage="No Restaurants found.">
                        <Column field="_id" header="Id" sortable></Column>
                        <Column field="name" header="Restoran" sortable></Column>
                        <Column field="status" header="Durum"  sortable></Column>
                        <Column field="total_amount" header="Toplam Miktar" sortable></Column>
                        <Column field="createdAt" header="Sipariş Zamanı" sortable></Column>
                        <Column header="İşlemler" body={actionBodyTemplate}></Column>
                    </S.Table>
            </div>
        </div>
    );
}

export default Orders;
