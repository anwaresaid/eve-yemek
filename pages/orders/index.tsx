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
import { Button } from 'primereact/button'
import { priceBodyTemplate } from '../../components/InTableComponents/price'

const Orders = () => {

    const router = useRouter();
    const [globalFilter, setGlobalFilter] = useState(null);
    const res = useSelector((state: RootState) => state.listOrders);
    const { loading, success, orders } = res;
    const dispatch = useDispatch();
    const path = 'orders';

    useEffect(() => {
            dispatch(listOrders())
    },[dispatch])

    const editButton = (row) => {
        return (
            <React.Fragment>
                <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => { router.push(`/${path}/${row.order}`) }} />
            </React.Fragment>
        );
    }

    const columns = [
        { field: 'order', header: 'ID' },
        { field: 'restaurant.name', header: i18n.t('restaurant') },
        { field: 'status', header: i18n.t('status'), body: (rowData) => OrderStatus(rowData.status, rowData.delivery_status)},
        { field: 'total_amount', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.total_amount, rowData.currency_type) },
        { field: 'howLongAgo', header: i18n.t('orderTime') },
        { field: 'ops', header: i18n.t('operations'), body: (rowData) => editButton(rowData) }
    ]   

    return (
        <div id="ordersTable">
            {loading ? <Loading /> : success && orders && orders.items &&
                <div id="ordersCard" className="card">
                    <h1 id="ordersHeader">{i18n.t('orders')}</h1>
                    <StandardTable
                        header={Header(setGlobalFilter, i18n.t('orders'))}
                        columns={columns}
                        value={_.without(_.map(orders.items, (item) => { if (!item.is_deleted) return item }), undefined).reverse()}
                        globalFilter={globalFilter}
                        emptyMessage={i18n.t('noXfound', { x: i18n.t('orders') })} >
                    </StandardTable>
                </div>}
        </div>
    );
}

export default Orders
