import React, { useState, useRef, useEffect } from "react";
import * as S from "../styles/index.style";
import { Card } from "primereact/card";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { getDashboardReport } from "../store/actions/dashboard.action";
import {ProgressSpinner} from 'primereact/progressspinner'

const Index = (props) => {

    const res = useSelector((state:RootState) => state.dashboardReport)
    const {loading, success, reportData} = res
    const dispatch = useDispatch()

    useEffect(() => {
        if (!reportData)
            dispatch(getDashboardReport())
        
    },[dispatch])

    const parseCounts = (counts) => {
        if(!counts)
            return
        let out = []
        for (let i of counts){
            out[i._id - 1] = i.count
        }
        out = Array.from(out, item => item || 0);
        return out
    }

    const lineChartData = {
        labels: reportData?.lastSevenDaysReport.order.days,
        datasets: [
            {
                label: "Bu Hafta",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                data: parseCounts(reportData?.lastSevenDaysReport.order.counts)
            }
        ]
    };
    return (
        <div id='containerPanel' className="ContainerPanel">
            {loading ? <ProgressSpinner /> :
            <S.DashboardWrapper id='dashBoard'>
            <h1 id='controlPanelHeader'>Kontrol Paneli</h1>
            <div className='p-grid p-grid-container'>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div id='boxDiv' className='box' style={{ backgroundColor: "#17a2b8" }}>
                        <div id='boxInfoDiv' className='box__info'>
                            <span id='dailyOrders'>{reportData?.report.daily_orders.length}</span>
                            <p id='boxInfoP'>Günlük Siparişler</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi pi-shopping-cart'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div id='boxDiv'className='box' style={{ backgroundColor: "#28a745" }}>
                        <div id='box_infoDiv' className='box__info'>
                            <span id='daily_income_report'>₺{reportData?.report.daily_income}</span>
                            <p id='daily_incomeP'>Günlük Kazanç</p>
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
                            <p id='total_ordersP'>Toplam Siparişler</p>
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
                            <p id='failed_ordersP'>Başarısız Siparişler</p>
                        </div>
                        <div id='box_icons' className='box__icons'>
                            <i id='infoIcon' className='pi pi-info'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-4 p-lg-2'>
                    <div id='box' className='box' style={{ backgroundColor: "#dc3545" }}>
                        <div id='box_info' className='box__info'>
                            <span id='total_income_report'>₺{reportData?.report.total_income}</span>
                            <p id='total_incomeP'>Toplam Kazanç</p>
                        </div>
                        <div id='box_icons' className='box__icons'>
                            <i id='money_billIcon' className=' pi  pi-money-bill'></i>
                        </div>
                    </div>
                </div>
            </div>

            <Card id='last_7_days_orders' subTitle='Son 7 günün siparişleri'>
                <i id='shopping_cartIcon' className='pi pi-shopping-cart'>
                    <span id='last_seven_days_report'>{parseCounts(reportData?.lastSevenDaysReport.order.counts)?.reduce((a, b) => a + b, 0)} Sipariş</span>
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
