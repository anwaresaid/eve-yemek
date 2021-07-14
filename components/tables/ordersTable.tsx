import React, { useState } from "react";
import StandardTable from '../StandardTable'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import activeTag from "../InTableComponents/activeTag";
import Header from "../InTableComponents/Header";
import { i18n } from "../../language";
import OrderStatus from "../InTableComponents/orderStatusTag";
import { Button } from "primereact/button";
import { priceBodyTemplate } from "../InTableComponents/price";

const OrdersTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'orders'; 

    const editButton = (row) => {
        return (
            <React.Fragment>
                <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => { router.push(`/${path}/${row.order}`) }} />
            </React.Fragment>
        );
    }

    const StatusBodyTemplate = (rowData) => {
        return (
            <div>
                <React.Fragment>
                    <span className="p-column-title"> {i18n.t('status')} </span>
                    <span> {OrderStatus(rowData.status)} </span>
                </React.Fragment>
            </div>
        );
    }

    const columns = [
        {field: 'order', header: '#'},
        {field: 'restaurant.name', header: i18n.t('restaurant')},
        {field: 'status', body: StatusBodyTemplate},
        {field: 'total_amount', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.total_amount, rowData.currency_type)},
        {field: 'howLongAgo', header: i18n.t('orderTime')}, 
        {field: 'ops', header: i18n.t('operations'), body: (row) => editButton(row)}
    ]
    
    return (
        <StandardTable 
            header={Header(setGlobalFilter,i18n.t('liveOrders'))}
            columns={columns} 
            value={props.orders}  
            globalFilter={globalFilter} 
            emptyMessage={i18n.t('noXfound',{x:i18n.t('orders')})} >     
        </StandardTable>
    )
}

export default OrdersTable;