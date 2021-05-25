import React from "react";
import { Dropdown } from 'primereact/dropdown';

const dropDown = (props) => {    
    return (
        <div className="p-grid">
            <div className="p-col">
                <h4>{props.label}</h4>
            </div>
            <div className="p-col">
                <Dropdown value={props.value} options={props.options} onChange={props.onChange} optionLabel={props.optionLabel} placeholder={props.placeHolder} />
            </div>
        </div>
    );
}

export default dropDown;