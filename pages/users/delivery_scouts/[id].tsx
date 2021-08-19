import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as S from "../../../styles/index.style"
import UpdateUser from '../../../components/UpdateUser'
import BackBtn from '../../../components/backBtn'
import { TabPanel, TabView } from 'primereact/tabview'
import { i18n } from '../../../language'
import _ from 'lodash'
import DeliveryService from '../../../store/services/deliveries.service'
import moment from 'moment'
import { parseDateInAllRows, parseDateInOneRow } from '../../../helpers/dateFunctions'
import { Calendar } from 'primereact/calendar'
import StandardTable from '../../../components/StandardTable'

const UpdateScout = () => {

    const router = useRouter()
    const deliveryService = new DeliveryService();

    const [deliveryScoutData, setDeliveryScoutData] = useState(null)
    const [dates, setDates] = useState([])

    const getTodaysDeliveryCount = () => {
        if (!deliveryScoutData)
            return
        let today = deliveryScoutData.deliveries_by_day.filter(d => d._id == moment(new Date()).format("YYYY-MM-DD"))
        if (today.length === 0)
            return 0
        else
            return today[0].count
    }

    const getTodaysAmount = () => {
        if (!deliveryScoutData)
            return
        let today = deliveryScoutData.total_amount_by_day.filter(d => d._id == moment(new Date()).format("YYYY-MM-DD"))
        if (today.length === 0)
            return 0
        else
            return today[0].total
    }

    const deliveriesTableColumns = [
        {
            field: 'order.order_code',
            header: i18n.t('order'),
            body: (row) => (
                <a
                    href={'/orders/' + row.order?._id}
                    style={{ textDecoration: 'none' }}
                >
                    {row.order.order_code}
                </a>
            )
        },
        {
            header: i18n.t('status'),
            body: (row) => (row.status)
        },
        {
            field: 'createdAt',
            header: i18n.t('created')
        },
        {
            header: i18n.t('totalAmount'),
            body: (row) => (row.order.total_amount)
        }
    ]

    const getTableHeaderComps = () => {
        return <div className="table-header">
            <Calendar selectionMode="range" value={dates} onChange={(e) => { setDates(e.value as Array<Date>)}}
                placeholder={i18n.t('selectDates')}
                style={{ float: 'right' }}
                dateFormat="dd/mm/yy"
                showButtonBar
            ></Calendar>
            <span>{i18n.t('currentTotal') + ': ' + _.sum(deliveryScoutData?.items.filter(filterDeliveries).map(d => d.order.total_amount))}</span>
        </div>
    }

    useEffect(() => {
        if (!deliveryScoutData && router.isReady) {
            deliveryService.getScoutData(router.query['id'])
                .then((res) => {
                    setDeliveryScoutData(parseDateInAllRows(res[0]))
                })
                .catch((err) => {

                })
        }
    }, [router])

    const filterDeliveries = (delivery) => {
        if (!dates)
            return delivery
        if (!dates[0] || !dates[1])
            return delivery
        return moment(delivery.createdAt, 'DD-MM-YYYY HH:mm').isBetween(dates[0], dates[1])
    }

    return (
        <div id='updateScoutUserDiv'>
            <BackBtn router={router} />
            <TabView>
                <TabPanel header={i18n.t('userInformation')}>
                    <UpdateUser
                        id={router.query.id}
                        returnTo="/users/delivery_scouts">
                    </UpdateUser>
                </TabPanel>
                <TabPanel header={i18n.t('deliveryInformation')}>
                    <S.DashboardWrapper>
                        <div className='p-grid p-grid-container'>
                            <div className='p-col-6 p-md-6 p-lg-2'>
                                <div id='boxDiv' className='box' style={{ backgroundColor: "#17a2b8" }}>
                                    <div id='boxInfoDiv' className='box__info'>
                                        <span id='todaysDeliveriesBox'>{getTodaysDeliveryCount()}</span>
                                        <p id='boxInfoP'>{i18n.t('todaysDeliveries')}</p>
                                    </div>
                                    <div className='box__icons'>
                                        <i className='pi pi-shopping-cart'></i>
                                    </div>
                                </div>
                            </div>
                            <div className='p-col-6 p-md-6 p-lg-2'>
                                <div id='boxDiv' className='box' style={{ backgroundColor: "#28a745" }}>
                                    <div id='box_infoDiv' className='box__info'>
                                        <span id='todaysAmountBox'>{getTodaysAmount()}</span>
                                        <p id='today_amountP'>{i18n.t('todaysAmount')}</p>
                                    </div>
                                    <div id='box_icons' className='box__icons'>
                                        <i id='money_bill' className=' pi pi-money-bill'></i>
                                    </div>
                                </div>
                            </div>
                            <div className='p-col-6 p-md-4 p-lg-2'>
                                <div id='box' className='box' style={{ backgroundColor: "#ffc107" }}>
                                    <div id='box_info' className='box__info'>
                                        <span id='totalDeliveriesBox'>{deliveryScoutData?.total_deliveries?.count}</span>
                                        <p id='total_DeliveriesP'>{i18n.t('totalDeliveries')}</p>
                                    </div>
                                    <div id='box_icons' className='box__icons'>
                                        <i id='shopping_cartIcon' className=' pi pi-shopping-cart'></i>
                                    </div>
                                </div>
                            </div>
                            <div className='p-col-6 p-md-4 p-lg-2'>
                                <div id='box' className='box' style={{ backgroundColor: "#FFD580" }}>
                                    <div id='box_info' className='box__info'>
                                        <span id='totalAmountBox'>{deliveryScoutData?.total_amount?.total}</span>
                                        <p id='total_amountP'>{i18n.t('totalAmount')}</p>
                                    </div>
                                    <div id='box_icons' className='box__icons'>
                                        <i id='money_bill' className=' pi pi-money-bill'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </S.DashboardWrapper>

                    <StandardTable
                        header={getTableHeaderComps()}
                        columns={deliveriesTableColumns}
                        value={deliveryScoutData?.items.filter(filterDeliveries)}
                        emptyMessage={i18n.t('noXfound', {x: i18n.t('deliveries')})}
                        noPaginator
                    >
                    </StandardTable>
                </TabPanel>
            </TabView>
        </div>
    )
}

export default UpdateScout
