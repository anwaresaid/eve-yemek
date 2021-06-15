import React, { useState,useEffect } from "react";
import { Divider } from 'primereact/divider';

const cardDate = (props) => {    
    return (
        <div>
            <div id='dividerDiv'>
                <Divider />
                <div id='cardDateDiv' className="p-grid">
                    <b id='cardDateLabel' className="p-col">{props.label}</b>
                    <div id='dateDiv' className="p-col">
                        {props.value}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cardDate;