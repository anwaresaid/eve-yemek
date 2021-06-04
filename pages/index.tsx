import React, { useState, useRef, useEffect } from "react";
import * as S from "../styles/index.style";
import { Card } from "primereact/card";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { getDashboardReport } from "../store/actions/dashboard.action";
import {ProgressSpinner} from 'primereact/progressspinner'
import { i18n } from "../language";

const Index = (props) => {
    const res = useSelector((state:RootState) => state.dashboardReport)
    const {loading, success, reportData} = res
    const dispatch = useDispatch()

    useEffect(() => {
        if (!reportData)
            dispatch(getDashboardReport())
        
    },[dispatch])

    const lineChartData = {
        labels: (reportData?.lastSevenDaysReport.order.days.length === 0) ? ["28(MockData)", "30", "1", "2", "3", "4", "5"] : reportData?.lastSevenDaysReport.order.days,
        datasets: [
            {
                label: i18n.t('thisWeek'),
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                data: (reportData?.lastSevenDaysReport.order.counts.length === 0) ? [16, 2, 4, 6, 8, 10, 12] : reportData?.lastSevenDaysReport.order.counts
            }
        ]
    };
    return (
        <div className="ContainerPanel">
            {loading ? <ProgressSpinner /> :
            <S.DashboardWrapper>
            <h1>{i18n.t('dashboard')}</h1>
            <div className='p-grid p-grid-container'>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#17a2b8" }}>
                        <div className='box__info'>
                            <span>{reportData?.report.daily_orders.length}</span>
                            <p>{i18n.t('dailyOrders')}</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi pi-shopping-cart'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#28a745" }}>
                        <div className='box__info'>
                            <span>₺{reportData?.report.daily_income}</span>
                            <p>{i18n.t('dailyEarnings')}</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi pi-money-bill'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-4 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#ffc107" }}>
                        <div className='box__info'>
                            <span>{reportData?.report.total_orders.total}</span>
                            <p>{i18n.t('totalOrders')}</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi pi-shopping-cart'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-4 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#dc3545" }}>
                        <div className='box__info'>
                            <span>?</span>
                            <p>{i18n.t('failedOrders')}</p>
                        </div>
                        <div className='box__icons'>
                            <i className='pi pi-info'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-4 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#dc3545" }}>
                        <div className='box__info'>
                            <span>₺{reportData?.report.total_income}</span>
                            <p>{i18n.t('totalEarnings')}</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi  pi-money-bill'></i>
                        </div>
                    </div>
                </div>
            </div>

            <Card subTitle={i18n.t('ordersFromTheLast7Days')}>
                <div className='view-report'>
                    <a href="#">{i18n.t('viewReport')}</a>
                </div>
                <i className='pi pi-shopping-cart'>
                    <span>0 {i18n.t('orders')}</span>
                </i>
                <Line
                    type='number'
                    width={500}
                    height={100}
                    data={lineChartData}
                    options={{
                        legend: {
                            display: false
                        },
                        responsive: true,
                    }}
                />
            </Card>
        </S.DashboardWrapper>}
        </div>
    );
};

export default Index;
