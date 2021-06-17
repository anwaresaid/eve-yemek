import React, { useState } from "react";
import StandardTable from '../StandardTable'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import Header from "../InTableComponents/Header";
import { i18n } from "../../language";

const OrdersTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'orders'; 


    const columns = [
        {field: 'id', header: '#'},
        {field: 'restaurant_id.name', header: i18n.t('restaurant')},
        {field: 'status', header: i18n.t('status'), body: (rowData)=>activeTag(rowData.status === "ACTIVE")},
        {field: 'total_amount', header: i18n.t('total')},
        {field: 'howLongAgo', header: i18n.t('orderTime')}, 
        {field: 'ops', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return (
        <StandardTable 
            header={Header(setGlobalFilter,i18n.t('liveOrders'))}
            columns={columns} 
            value={props.orders}  
            globalFilter={globalFilter} 
            emptyMessage="No orders found" >     
        </StandardTable>
    )
}

export default OrdersTable;