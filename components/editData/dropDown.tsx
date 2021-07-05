import React from "react";
import { Dropdown } from 'primereact/dropdown';

const dropDown = (props) => {
    return (
        <div className="p-grid">
            <div id='dropDownHeaderDiv' className="p-col">
                <h4 id='dropDownHeader'>{props.label}</h4>
            </div>
            <div id='dropDownDiv' className="p-col">
                <Dropdown id='dropDown' value={props.value} options={props.options} onChange={props.onChange} optionLabel={props.optionLabel} placeholder={props.placeHolder} />
            </div>
        </div>
    );
}

export default dropDown;
