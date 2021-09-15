import React, { useState, useRef, useEffect } from "react";
import * as S from "../styles/index.style";
import { Card } from "primereact/card";
import { Bar, Line, Pie } from "react-chartjs-2";
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
import { TabPanel, TabView } from "primereact/tabview";
import { getRandomColor } from "../helpers/colors";
import { getDemandData } from "../store/actions/service-demand.action";
import { Dropdown } from "primereact/dropdown";
import { Carousel } from 'primereact/carousel';
import { ChartType } from "chart.js";

const Index = (props) => {
    const res = useSelector((state: RootState) => state.dashboardReport)
    const { loading, success, reportData } = res
    const chartRef = useRef<HTMLCanvasElement>(null);
    const ownedRestaurantsState = useSelector((state: RootState) => state.ownedRestaurants)
    const { loading: ownedRestaurantsLoading, success: ownedRestaurantsSuccess, ownedRestaurants } = ownedRestaurantsState

    const serviceDemandState = useSelector((state: RootState) => state.serviceDemand)
    const { loading: serviceDemandLoading, success: serviceDemandSuccess, demandData } = serviceDemandState

    const [citiesChartType, setCitiesChartType] = useState('pie')

    let citiesChartTypeOptions = [
        { label: 'Pie Chart', value: 'pie' },
        { label: 'Bar Chart', value: 'bar' },
    ]

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
        if ((auth.hasRoles(['admin']) || auth.hasRoles(['super_admin'])) || auth.hasRoles(['customer_service'])) {
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
                label: 'Dataset',
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

    const carouselItems = [
        { enclosingKey: 'daily_orders', innerKey: 'length', backgroundColor: '#17a2b8', text: i18n.t('dailyOrders'), icon: 'pi pi-shopping-cart' },
        { key: 'daily_income', currency: 'LD', backgroundColor: '#28a745', text: i18n.t('dailyEarnings'), icon: 'pi pi-money-bill' },
        { enclosingKey: 'total_orders', innerKey: 'total', backgroundColor: '#ffc107', text: i18n.t('totalOrders'), icon: 'pi pi-shopping-cart' },
        { key: 'failed_orders', backgroundColor: '#dc3545', text: i18n.t('failedOrders'), icon: 'pi pi-exclamation-triangle' },
        { key: 'total_income', currency: 'LD', backgroundColor: '#008080', text: i18n.t('totalEarnings'), icon: 'pi pi-money-bill' }
    ]

    if ((auth.hasRoles(['admin']) || auth.hasRoles(['super_admin'])) || auth.hasRoles(['customer_service'])) {
        carouselItems.push({ key: 'daily_profit', currency: 'LD', backgroundColor: '#90EE90', text: i18n.t('dailyProfit', ), icon: 'pi pi-angle-up' })
        carouselItems.push({ key: 'weekly_profit', currency: 'LD', backgroundColor: '#00FF00', text: i18n.t('weeklyProfit', ), icon: 'pi pi-angle-up' })
        carouselItems.push({ key: 'monthly_profit', currency: 'LD', backgroundColor: '#006400', text: i18n.t('monthlyProfit', ), icon: 'pi pi-angle-up' })
    }

    const carouselItemTemplate = (item) => {
        let valueText = item.key ? reportData?.report[item.key] : reportData?.report[item.enclosingKey][item.innerKey]

        return <div id='box' className='box p-mr-2' style={{ backgroundColor: item.backgroundColor }} >
            <div id='box_info' className='box__info'>
                <span id='total_orders_report'>{(item.currency ?? '') + ' ' + valueText}</span>
                <p id='total_ordersP'>{item.text}</p>
            </div>
            <div id='box_icons' className='box__icons'>
                <i className={item.icon}></i>
            </div>
        </div>
    }

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
                    <Carousel className='p-grid p-grid-container' value={carouselItems} itemTemplate={carouselItemTemplate} numVisible={3} numScroll={2}></Carousel>
                    <Card id='last_7_days_orders' subTitle={i18n.t('ordersFromTheLast7Days')}>
                        <i id='shopping_cartIcon' className='pi pi-shopping-cart'>
                            <span id='last_seven_days_report'>{getTotalOrdersWeekly()}</span>
                        </i>
                        <Line
                            type="line"
                            ref={chartRef}
                            width={500}
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
        return ((auth.hasRoles(['admin']) || auth.hasRoles(['super_admin'])) || auth.hasRoles(['customer_service'])) ?
            <TabPanel header={i18n.t('areas')}>
                <TabView activeIndex={activeIndexAreas} onTabChange={e => setActiveIndexAreas(e?.index)}>
                    <TabPanel header={i18n.t('cities')}>
                        {
                            citiesChartType === 'bar' && <div>
                                <Bar type="bar" data={citiesPieChartData} width={500} height={500} options={{
                                    maintainAspectRatio: false,
                                    plugins: {

                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    var print = ''
                                                    print += demandData[context.dataIndex].states.map(s => ' ' + s.state + ': ' + s.count)
                                                    return print
                                                }
                                            }
                                        }
                                    },
                                    onClick: function (evt, item) {
                                        if (item[0]) {
                                            setCityIndex(item[0]?.index)
                                            setActiveIndexAreas(1)
                                        }
                                    },
                                }}></Bar>
                            </div>
                        }

                        {
                            citiesChartType === 'pie' && <div>
                                <Pie type="pie" data={citiesPieChartData} width={500} height={500} options={{
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
                                    legendCallback: function (chart) {
                                        return <span>legend</span> + ''
                                    },
                                    onClick: function (evt, item) {
                                        if (item[0]) {
                                            setCityIndex(item[0]?.index)
                                            setActiveIndexAreas(1)
                                        }
                                    },
                                }}>
                                </Pie>
                            </div>
                        }
                        <div>
                            <Dropdown id="isBar" options={citiesChartTypeOptions} onChange={e => setCitiesChartType(e.value)}
                                optionLabel="label" optionValue='value' value={citiesChartType} />
                        </div>
                    </TabPanel>
                    <TabPanel header={demandData ? i18n.t('districtsInX', { x: demandData[cityIndex]?._id }) : ''}>
                        <Pie type="pie" data={districtsPieChartData} width={500} height={500} options={{
                            maintainAspectRatio: false
                        }}
                        >
                        </Pie>
                    </TabPanel>
                </TabView>
            </TabPanel >
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
                ((auth.hasRoles(['admin']) || auth.hasRoles(['super_admin'])) || auth.hasRoles(['customer_service'])) ?
                    extendedTabView() : restrictedTabView()
            }
        </div >
    );
};

export default Index;
