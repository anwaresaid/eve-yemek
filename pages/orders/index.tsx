import React, { useState, useEffect } from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRouter } from 'next/router'
import StandardTable from '../../components/StandardTable'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../store/actions/orders.action'
import {ProgressSpinner} from 'primereact/progressspinner'
import { editTagTemplate } from '../../styles/standard_table_style/standard.table.style';
import EditBtn from '../../components/InTableComponents/editButton/index';
import Header from '../../components/InTableComponents/Header/index';

const Orders = () => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const res = useSelector((state:RootState) => state.listOrders);
    const {loading, success, orders} = res;
    const dispatch = useDispatch();
    const path = 'orders';
    
    useEffect(() => {
        if (!orders)
            dispatch(listOrders())
        else if (success)
            setRows(orders.items)
    },[dispatch, success])

    const handleViewButtonClick = (id) => {
        if(id){
            router.push(`/orders/${id}`)
        }
    }

    const columns = [
        {field: '_id', header: 'ID'},
        {field: 'name', header: 'Restoran'},
        {field: 'status', header: 'Durum'},
        {field: 'total_amount', header: 'Toplam Miktar'}, 
        {field: 'howLongAgo', header: 'Sipariş Zamanı'},
        {field: 'ops', header: 'Detaylar', body: (rowData) =>EditBtn(rowData,router,path)}
    ]

    return (
        <div>
            {loading ? <ProgressSpinner /> : 
            <div className="card">
                <h1>Siparişler</h1>
                <StandardTable 
                    header={Header(setGlobalFilter,"orders")}
                    columns={columns} 
                    value={rows}  
                    globalFilter={globalFilter} 
                    emptyMessage="No orders found" >     
                </StandardTable>
            </div>}
        </div>
    );
}

export default Orders
