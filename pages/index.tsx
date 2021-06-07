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
            out[i._id] = i.count
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
        <div className="ContainerPanel">
            {loading ? <ProgressSpinner /> :
            <S.DashboardWrapper>
            <h1>Kontrol Paneli</h1>
            <div className='p-grid p-grid-container'>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#17a2b8" }}>
                        <div className='box__info'>
                            <span>{reportData?.report.daily_orders.length}</span>
                            <p>Günlük Siparişler</p>
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
                            <p>Günlük Kazanç</p>
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
                            <p>Toplam Siparişler</p>
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
                            <p>Başarısız Siparişler</p>
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
                            <p>Toplam Kazanç</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi  pi-money-bill'></i>
                        </div>
                    </div>
                </div>
            </div>

            <Card subTitle='Son 7 günün siparişleri'>
                <div className='view-report'>
                    <a href="#">Raporu görüntüle</a>
                </div>
                <i className='pi pi-shopping-cart'>
                    <span>0 Sipariş</span>
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
