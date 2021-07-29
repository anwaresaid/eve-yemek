import React, { useState, useRef, useEffect } from "react";
import * as S from "../styles/index.style";
import { Card } from "primereact/card";
import { Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { getDashboardReport } from "../store/actions/dashboard.action";
import { i18n } from "../language";
import Loading from "../components/Loading";
import auth from "../helpers/core/auth";
import _ from 'lodash';
import StandardTable from "../components/StandardTable";
import { listOwnedRestaurants, openCloseRestaurant } from "../store/actions/restaurant.action";
import { SelectButton } from 'primereact/selectbutton';
import idColumn from "../components/InTableComponents/idColumn";
import { Tag } from "primereact/tag";
import { Chart } from 'chart.js'
import { TabPanel, TabView } from "primereact/tabview";
import { getRandomColor } from "../helpers/colors";
import { getDemandData } from "../store/actions/service-demand.action";

const Index = (props) => {
    const res = useSelector((state: RootState) => state.dashboardReport)
    const { loading, success, reportData } = res
    const chartRef = useRef<HTMLCanvasElement>(null);
    const ownedRestaurantsState = useSelector((state: RootState) => state.ownedRestaurants)
    const { loading: ownedRestaurantsLoading, success: ownedRestaurantsSuccess, ownedRestaurants } = ownedRestaurantsState

    const serviceDemandState = useSelector((state: RootState) => state.serviceDemand)
    const { loading: serviceDemandLoading, success: serviceDemandSuccess, demandData } = serviceDemandState

    const [activeIndexAreas, setActiveIndexAreas] = useState(0);
    const [cityIndex, setCityIndex] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!reportData)
            dispatch(getDashboardReport())
        if (auth.hasRoles(['restaurant_owner'])) {
            if (ownedRestaurants?.items.length === 0 && !ownedRestaurantsSuccess)
                dispatch(listOwnedRestaurants())
        }
        if (auth.hasRoles(['admin']) || auth.hasRoles(['customer_service'])) {
            if (!demandData) {
                dispatch(getDemandData())
            }

        }
    }, [dispatch, ownedRestaurantsSuccess]);

    const parseCounts = (data) => {
        if (!data)
            return
        if (!data.days)
            return
        let out = {}
        for (let i of data.days) {
            out[i + ''] = 0
        }
        for (let j of data.counts) {
            out[j._id + ''] = j.count
        }
        return Object.values(out);
    }

    const getTotalOrdersWeekly = () => {
        if (reportData) {
            return _.sum(parseCounts(reportData.lastSevenDaysReport.order))
        }
    }
    const lineChartData = {

        labels: reportData?.lastSevenDaysReport.order.days,
        datasets: [
            {
                label: i18n.t('thisWeek'),
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                data: parseCounts(reportData?.lastSevenDaysReport.order),
            }

        ],


    };

    const citiesPieChartData = {

        labels: demandData?.map(el => el._id === null ? 'Other' : el._id),
        datasets: [
            {
                data: demandData?.map(city => _.sum(city.states.map(state => state.count))),
                backgroundColor: demandData?.map(() => { return getRandomColor() })
            }
        ],
    };

    const districtsPieChartData = {
        labels: demandData ? demandData[cityIndex]?.states.map(district => district.state) : [''],
        datasets: [
            {
                data: demandData ? demandData[cityIndex]?.states.map(district => district.count) : [''],
                backgroundColor: demandData?.map(() => { return getRandomColor() })
            }
        ]
    }

    const openClosedTag = (rowData) => {
        const setIsOpen = (isOpen) => {
            if (isOpen === null)
                return
            dispatch(openCloseRestaurant(rowData.id, { is_open: isOpen }))
        }
        return <SelectButton value={rowData.is_open} options={[{ label: i18n.t('open'), value: true }, { label: i18n.t('closed'), value: false }]} onChange={(e) => setIsOpen(e.value)} />
    }

    const ownedRestaurantsTableColumns = [
        { field: '#', header: '#', body: idColumn, style: { 'width': '20px' } },
        { field: 'name', header: i18n.t('restaurant') },
        { field: 'is_open', header: i18n.t('status'), body: openClosedTag },
    ]

    const checkIfNoMeals = (ownedRestaurants: any) => {
        if (ownedRestaurants?.items?.length > 0) {
            for (let one of ownedRestaurants.items) {
                if (one.foods.length > 0)
                    return false
            }
        }
        return true
    }

    const overviewTabPanel = () => {
        return <TabPanel header={i18n.t('overview')}>
            {loading ? <Loading /> :
                <S.DashboardWrapper id='dashBoard'>

                    {
                        auth.hasRoles(["restaurant_owner"]) && checkIfNoMeals(ownedRestaurants) && <Tag severity="danger" value={i18n.t('noneOfYourRestaurantsHaveAnyMealsAdded')}></Tag>
                    }
                    {
                        auth.hasRoles(["restaurant_owner"]) &&
                        <div className="p-my-5">
                            <StandardTable id='ownedRestaurants'
                                columns={ownedRestaurantsTableColumns}
                                value={ownedRestaurants?.items}
                                noPaginator
                                style={{ tableLayout: "auto" }}
                                resizableColumns
                                columnResizeMode="expand" showGridlines
                            ></StandardTable>
                        </div>
                    }
                    <div className='p-grid p-grid-container'>
                        <div className='p-col-6 p-md-6 p-lg-2'>
                            <div id='boxDiv' className='box' style={{ backgroundColor: "#17a2b8" }}>
                                <div id='boxInfoDiv' className='box__info'>
                                    <span id='dailyOrders'>{reportData?.report.daily_orders.length}</span>
                                    <p id='boxInfoP'>{i18n.t('dailyOrders')}</p>
                                </div>
                                <div className='box__icons'>
                                    <i className='pi pi-shopping-cart'></i>
                                </div>
                            </div>
                        </div>
                        <div className='p-col-6 p-md-6 p-lg-2'>
                            <div id='boxDiv' className='box' style={{ backgroundColor: "#28a745" }}>
                                <div id='box_infoDiv' className='box__info'>
                                    <span id='daily_income_report'>₺{reportData?.report.daily_income}</span>
                                    <p id='daily_incomeP'>{i18n.t('dailyEarnings')}</p>
                                </div>
                                <div id='box_icons' className='box__icons'>
                                    <i id='money_bill' className=' pi pi-money-bill'></i>
                                </div>
                            </div>
                        </div>
                        <div className='p-col-6 p-md-4 p-lg-2'>
                            <div id='box' className='box' style={{ backgroundColor: "#ffc107" }}>
                                <div id='box_info' className='box__info'>
                                    <span id='total_orders_report'>{reportData?.report.total_orders.total}</span>
                                    <p id='total_ordersP'>{i18n.t('totalOrders')}</p>
                                </div>
                                <div id='box_icons' className='box__icons'>
                                    <i id='shopping_cartIcon' className=' pi pi-shopping-cart'></i>
                                </div>
                            </div>
                        </div>
                        <div className='p-col-6 p-md-4 p-lg-2'>
                            <div id='box' className='box' style={{ backgroundColor: "#dc3545" }}>
                                <div id='box_info' className='box__info'>
                                    <span id='failed_orders_report'>{reportData?.report.failed_orders}</span>
                                    <p id='failed_ordersP'>{i18n.t('failedOrders')}</p>
                                </div>
                                <div id='box_icons' className='box__icons'>
                                    <i id='infoIcon' className='pi pi-exclamation-triangle'></i>
                                </div>
                            </div>
                        </div>
                        <div className='p-col-6 p-md-4 p-lg-2'>
                            <div id='box' className='box' style={{ backgroundColor: "#dc3545" }}>
                                <div id='box_info' className='box__info'>
                                    <span id='total_income_report'>₺{reportData?.report.total_income}</span>
                                    <p id='total_incomeP'>{i18n.t('totalEarnings')}</p>
                                </div>
                                <div id='box_icons' className='box__icons'>
                                    <i id='money_billIcon' className=' pi  pi-money-bill'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Card id='last_7_days_orders' subTitle={i18n.t('ordersFromTheLast7Days')}>
                        <i id='shopping_cartIcon' className='pi pi-shopping-cart'>
                            <span id='last_seven_days_report'>{getTotalOrdersWeekly()}</span>
                        </i>
                        <Line
                            ref={chartRef}
                            width={500}
                            datatype='number'
                            height={100}
                            data={lineChartData}
                            options={{
                                plugins: {
                                    legend: {
                                        onClick: () => { }
                                    }
                                },
                                responsive: true,
                            }}
                        />
                    </Card>
                </S.DashboardWrapper>}
        </TabPanel>
    }

    const areasTabPanel = () => {
        return (auth.hasRoles(['admin']) || auth.hasRoles(['customer_service'])) ?
            <TabPanel header={i18n.t('areas')}>
                <TabView activeIndex={activeIndexAreas} onTabChange={e => setActiveIndexAreas(e?.index)}>
                    <TabPanel header={i18n.t('cities')}>
                        <Pie datatype='number' data={citiesPieChartData} width={500} height={500} options={{
                            maintainAspectRatio: false, plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            var print = ' ' + context.label + ' |'
                                            print += demandData[context.dataIndex].states.map(s => ' ' + s.state + ': ' + s.count)
                                            return print
                                        }
                                    }
                                }
                            },
                            onClick: function (evt, item) {
                                setCityIndex(item[0]?.index)
                                setActiveIndexAreas(1)
                            },
                        }}>
                        </Pie>
                    </TabPanel>
                    <TabPanel header={demandData ? i18n.t('districtsInX', {x: demandData[cityIndex]._id}) : ''}>
                        <Pie datatype='number' data={districtsPieChartData} width={500} height={500} options={{
                            maintainAspectRatio: false
                        }}
                        >

                        </Pie>
                    </TabPanel>
                </TabView>
            </TabPanel>
            :
            <p>Unauthorized</p>
    }

    const restrictedTabView = () => {
        return <TabView>
            {overviewTabPanel()}
        </TabView>
    }

    const extendedTabView = () => {
        return <TabView>
            {overviewTabPanel()}
            {areasTabPanel()}
        </TabView >
    }

    return (

        <div id='containerPanel' className="ContainerPanel">
            <h1 id='controlPanelHeader'>{i18n.t('dashboard')}</h1>
            {
                (auth.hasRoles(['admin']) || auth.hasRoles(['customer_service'])) ?
                    extendedTabView() : restrictedTabView()
            }
        </div >
    );
};

export default Index;
