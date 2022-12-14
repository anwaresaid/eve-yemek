import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import OrdersService from "../../store/services/orders.service"
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
import SSPaginatorTable from '../../components/SSPaginatorTable'
import { detailedDate, parseDateInAllRows } from '../../helpers/dateFunctions'

const Orders = () => {

    const router = useRouter();
    const ordersService = new OrdersService()

    const path = 'orders';

    const editButton = (row) => {
        return (
            <React.Fragment>
                <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => { router.push(`/${path}/${row.order ?? row.id}`) }} />
            </React.Fragment>
        );
    }

    const orderStatusFilterOptions = [
        { label: i18n.t('orderPlaced'), value: 'placed' },
        { label: i18n.t('orderAccepted'), value: 'accepted' },
        { label: i18n.t('orderPrepared'), value: 'prepared' },
        { label: i18n.t('cancelled'), value: 'canceled' },
        { label: i18n.t('all'), value: '' }
    ]

    const deliveryStatusFilterOptions = [
        { label: i18n.t('onTheWay'), value: 'picked' },
        { label: i18n.t('delivered'), value: 'delivered' },
        { label: i18n.t('all'), value: '' }
    ]

    const columns = [
        { field: 'restaurant.name', header: i18n.t('restaurant'), body: row => <a href={"/restaurants/" + row.restaurant.id} style={{ textDecoration: 'none' }} >{row.restaurant.name}</a>, filter: true, filterType: 'search', sortable: true },
        { field: 'status', header: i18n.t('orderStatus'), body: (rowData) => OrderStatus(rowData.status), filter: true, filterType: 'dropdown', dropdownOptions: orderStatusFilterOptions },
        { field: 'delivery_status', header: i18n.t('deliveryStatus'), body: (rowData) => OrderStatus(rowData.delivery_status), filter: true, filterType: 'dropdown', dropdownOptions: deliveryStatusFilterOptions },
        { field: 'total_amount', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.total_amount, rowData.currency_type), sortable: true },
        { field: 'createdAt', header: i18n.t('orderTime'), body: row => detailedDate(row.createdAt), sortable: true },
        { field: 'ops', header: i18n.t('operations'), body: (rowData) => editButton(rowData) },
        { field: 'order', header: 'ID', sortable: true }
    ]

    return (
        <div id="ordersTable">
            <h1 id="ordersHeader">{i18n.t('orders')}</h1>
            <SSPaginatorTable
                headerText={i18n.t('listOfX', { x: i18n.t('orders') })}
                fetch={ordersService.getOrders}
                columns={columns}
                emptyMessage={i18n.t('noXfound', { x: i18n.t('orders') })}
            />
        </div>
    );
}

export default Orders
