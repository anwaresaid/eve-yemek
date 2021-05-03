import React, { useState, useRef } from "react";
import * as S from "./style";
const Index = () => {
  return (
    <S.DashboardWrapper className="a">
        <h1>Control Panel</h1>
        <div className='p-grid p-grid-container'>
          <div className='p-col-6 p-md-6 p-lg-3'>
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
          <div className='p-col-6 p-md-6 p-lg-3'>
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
          <div className='p-col-4 p-md-4 p-lg-2'>
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
          <div className='p-col-4 p-md-4 p-lg-2'>
            <div className='box' style={{ backgroundColor: "#dc3545" }}>
              <div className='box__info'>
                <span>0</span>
                <p>Unsuccessful Orders</p>
              </div>
              <div className='box__icons'>
                <i className=' pi pi-info'></i>
              </div>
            </div>
          </div>
          <div className='p-col-4 p-md-4 p-lg-2'>
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
    </S.DashboardWrapper>
  );
};

export default Index;
