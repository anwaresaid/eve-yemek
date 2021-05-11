import React, { useState, useRef } from "react";
import * as S from "../styles/index.style";
import { Card } from "primereact/card";
import { Line } from "react-chartjs-2";
import withAuth from "../helpers/withAuth";

const Index = (props) => {

    const lineChartData = {
        labels: ["28", "30", "1", "2", "3", "4", "5"],
        datasets: [
            {
                label: "Bu Hafta",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                data: [16, 2, 4, 6, 8, 10, 12],
            }
        ]
    };
    return (
        <S.DashboardWrapper>
            <h1>Kontrol Paneli</h1>
            <div className='p-grid p-grid-container'>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#17a2b8" }}>
                        <div className='box__info'>
                            <span>0</span>
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
                            <span>₺0</span>
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
                            <span>363</span>
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
                            <span>0</span>
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
                            <span>₺21778.75</span>
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
        </S.DashboardWrapper>
    );
};

export default withAuth(Index);
