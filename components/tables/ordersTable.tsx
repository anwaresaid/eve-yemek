import React, { useState } from "react";
import StandardTable from '../StandardTable'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import Header from "../InTableComponents/Header";

const OrdersTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'orders'; 

    const header =(
        <div className="table-header">
            List of Users
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const columns = [
        {field: '_id', header: '#'},
        {field: 'restaurant_id.name', header: 'Restoran'},
        {field: 'status', header: 'Durum', body: (rowData)=>activeTag(rowData.status === "ACTIVE")},
        {field: 'total_amount', header: 'Toplam'},
        {field: 'createdAt', header: 'Sipariş Zamanı'}, // in days
        {field: 'ops', header: 'İşlemler', body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return (
        <StandardTable 
            header={Header(setGlobalFilter,"live orders")}
            columns={columns} 
            value={props.orders}  
            globalFilter={globalFilter} 
            emptyMessage="No orders found" >     
        </StandardTable>
    )
}

export default OrdersTable;