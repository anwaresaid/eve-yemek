import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import DropDown from '../editData/dropDown';

const dropDown = (props) => {  
    const [currentStatus,setCurrentStatus] = useState(props.order?.status);
    const status = [
         'ACTIVE',
        'DISABLED',
    ];
const onChangeStatus = (e) =>{
    setCurrentStatus(e.value);
}
    return (
        
        <div>
            {currentStatus && 
            <div id='dropDownDiv'>
                <DropDown
                    id='dropDown'
                    value={currentStatus}
                    options={status}
                    onChange={onChangeStatus}
                    placeHolder="Sipariş Durumu"
                    label="Sipariş Durumu"
                    />
                <DropDown
                    id='dropDown'
                    placeHolder="Ödeme Durumu"
                    label="Ödeme Durumu"
                    />
                <DropDown
                    id='dropDown'
                    placeHolder="Kargocu Atama"
                    label="Kargocu Atama"
                    />      
            </div>
            }
        </div>
        
    );
}

export default dropDown;