import React, { useState,useEffect } from "react";
import { Divider } from 'primereact/divider';

const cardDate = (props) => {    
    return (
        <div>
            <div>
                <Divider/>
                <div className="p-grid">
                    <b className="p-col">{props.label}</b>
                    <div className="p-col">
                        {props.value}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cardDate;