import React, { useState, useRef } from "react";
import * as S from "./style";
import { Line } from "react-chartjs-2";
import { Card } from "primereact/card";

const Index = () => {
    const state = {
        labels: ["28th", "30th", "30th", "1st", "2nd", "3rd", "4th", "5th"],
        datasets: [
            {
                label: "This Week",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                data: [16, 2, 4, 6, 8, 10, 12, 14],
            },
        ],
    };
    return (
        <S.DashboardWrapper>
            <h1>Control Panel</h1>
            <div className='p-grid p-grid-container'>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#17a2b8" }}>
                        <div className='box__info'>
                            <span>0</span>
                            <p>Daily Orders</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi pi-shopping-cart'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-6 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#28a745" }}>
                        <div className='box__info'>
                            <span>$0</span>
                            <p>Daily Earnings</p>
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
                            <p>Total Orders</p>
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
                            <p>Unsuccessful Orders</p>
                        </div>
                        <div className='box__icons'>
                            <i className='pi pi-info'></i>
                        </div>
                    </div>
                </div>
                <div className='p-col-6 p-md-4 p-lg-2'>
                    <div className='box' style={{ backgroundColor: "#dc3545" }}>
                        <div className='box__info'>
                            <span>$21778.75</span>
                            <p>Total Earnings</p>
                        </div>
                        <div className='box__icons'>
                            <i className=' pi  pi-money-bill'></i>
                        </div>
                    </div>
                </div>
            </div>

            <Card subTitle='Orders for the last 7 days'>
                <div className='view-report'>
                    <a href=''>View Report</a>
                </div>
                <i className='pi pi-shopping-cart'>
                    <span>Order 6</span>
                </i>
                <p>Since Last week</p>
                <Line
                    type='number'
                    width={500}
                    height={100}
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: "Average Rainfall per month",
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: "right",
                        },
                        responsive: true,
                    }}
                />
            </Card>
        </S.DashboardWrapper>
    );
};

export default Index;
