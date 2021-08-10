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
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'

const Orders = () => {

    const router = useRouter();
    const [globalFilter, setGlobalFilter] = useState(null);
    const res = useSelector((state: RootState) => state.listOrders);
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const { loading, success, orders } = res;
    const dispatch = useDispatch();
    const path = 'orders';

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    const editButton = (row) => {
        return (
            <React.Fragment>
                <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => { router.push(`/${path}/${row.order ?? row.id}`) }} />
            </React.Fragment>
        );
    }

    const columns = [
        { field: 'order', header: 'ID' },
        { header: i18n.t('restaurant'), body: row => <a href={"/restaurants/" + row.restaurant.id} style={{ textDecoration: 'none' }} >{row.restaurant.name}</a> },
        { header: i18n.t('orderStatus'), body: (rowData) => OrderStatus(rowData.status) },
        { header: i18n.t('deliveryStatus'), body: (rowData) => OrderStatus(rowData.delivery_status) },
        { field: 'total_amount', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.total_amount, rowData.currency_type) },
        { field: 'howLongAgo', header: i18n.t('orderTime') },
        { field: 'ops', header: i18n.t('operations'), body: (rowData) => editButton(rowData) }
    ]

    const statusFilterDropdown = () => {
        return <MultiSelect options={[
            {
                label: i18n.t('orderStatus'), code: 'OS',
                items: [
                    { label: i18n.t('orderPlaced'), value: 'placed' },
                    { label: i18n.t('orderAccepted'), value: 'accepted' },
                    { label: i18n.t('orderPrepared'), value: 'prepared' },
                    { label: i18n.t('cancelled'), value: 'canceled' }
                ]
            },
            {
                label: i18n.t('deliveryStatus'), code: 'DS',
                items: [
                    { label: i18n.t('onTheWay'), value: 'picked' },
                    { label: i18n.t('delivered'), value: 'delivered' }
                ]
            }
        ]} placeholder={i18n.t('status')} value={selectedStatuses} onChange={(e) => setSelectedStatuses(e.value)} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items"></MultiSelect>
    }

    const getList = () => {
        return _.without(_.map(orders.items, (item) => {
            if (!item.is_deleted && ((selectedStatuses.includes(item.status) || selectedStatuses.includes(item.delivery_status)) || selectedStatuses.length === 0)) {
                return item
            }
        }), undefined)
    }

    return (
        <div id="ordersTable">
            {loading ? <Loading /> : success && orders && orders.items &&
                <div id="ordersCard" className="card">
                    <h1 id="ordersHeader">{i18n.t('orders')}</h1>
                    <StandardTable
                        header={Header(setGlobalFilter, i18n.t('orders'), statusFilterDropdown)}
                        columns={columns}
                        value={getList()}
                        globalFilter={globalFilter}
                        emptyMessage={i18n.t('noXfound', { x: i18n.t('orders') })} >
                    </StandardTable>
                </div>}
        </div>
    );
}

export default Orders
