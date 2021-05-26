import React, { useState, useEffect } from 'react';
import * as S from '../../styles/restaurants/restaurants.style';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRouter } from 'next/router'
import StandardTable from '../../components/StandardTable'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../store/actions/orders.action';

const Orders = () => {

    const router = useRouter()
    const [rows, setRows] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null)
    const res = useSelector((state:RootState) => state.listOrders)
    const {loading, success, orders} = res
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!orders)
            dispatch(listOrders())
        else if (success)
            setRows(orders.items)
    },[dispatch, success])

    const header =(
        <div className="table-header">
            Siparişler Listesi
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const handleViewButtonClick = (id) => {
        if(id){
            router.push(`/orders/${id}`);
        }
    }

    const actionBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                <Button label="Görüntüle" className="p-button-sm p-button-info" onClick={()=>handleViewButtonClick(rowData?._id)}/>
            </React.Fragment>
        );
    }

    const columns = [
        {field: '_id', header: 'ID'},
        {field: 'name', header: 'Restoran'},
        {field: 'status', header: 'Durum'},
        {field: 'total_amount', header: 'Toplam Miktar'}, 
        {field: 'createdAt', header: 'Sipariş Zamanı'},
        {field: 'ops', header: 'İşlemler', body: actionBodyTemplate}
    ]

    return (
        <div>
            <div className="card">
                <h1>Siparişler</h1>
                <StandardTable 
                    header={header}
                    columns={columns} 
                    value={rows}  
                    globalFilter={globalFilter} 
                    emptyMessage="No orders found" >     
                </StandardTable>
            </div>
        </div>
    );
}

export default Orders;
