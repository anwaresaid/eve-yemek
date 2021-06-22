import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import StandardTable from '../../components/StandardTable'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../store/actions/orders.action'
import EditBtn from '../../components/InTableComponents/editButton/index';
import Header from '../../components/InTableComponents/Header/index';
import OrderStatus from '../../components/InTableComponents/orderStatusTag'
import { i18n } from '../../language'
import _ from 'lodash';
import Loading from '../../components/Loading'

const Orders = () => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const res = useSelector((state:RootState) => state.listOrders);
    const {loading, success, orders} = res;
    const dispatch = useDispatch();
    const path = 'orders';
    
    useEffect(() => {
        if (orders.items.length === 0)
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
        {field: 'id', header: 'ID'},
        {field: 'name', header: i18n.t('restaurant')},
        {field: 'status', header: i18n.t('status'), body: (rowData) => OrderStatus(rowData.status)},
        {field: 'total_amount', header: i18n.t('total')}, 
        {field: 'howLongAgo', header: i18n.t('orderTime')},
        {field: 'ops', header: i18n.t('operations'), body: (rowData) =>EditBtn(rowData,router,path)}
    ]

    return (
        <div id="ordersTable">
            {loading ? <Loading  /> : [
                orders?.items?.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('orders')})}</h1>:
                    <div id="ordersCard" className="card">
                        <h1 id="ordersHeader">{i18n.t('orders')}</h1>
                        <StandardTable 
                            header={Header(setGlobalFilter,"orders")}
                            columns={columns} 
                            value={_.without(_.map(rows, (item) => {if (!item.is_deleted) return item}), undefined)}  
                            globalFilter={globalFilter} 
                            emptyMessage="No orders found" >     
                        </StandardTable>
                    </div>]}
        </div>
    );
}

export default Orders
