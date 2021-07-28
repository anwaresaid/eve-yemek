import React from "react";
import { Button } from "primereact/button";

const BackBtn = (props) => {
    const backclick = () => {
        return props.router.back();
    }
    return (
        <div className="p-grid">
            <div id='backBtn' className="p-col">
            <Button icon="pi pi-arrow-left" className="p-button-rounded p-button-text" onClick={backclick} />            
            </div>
        </div>
    );
}

export default BackBtn;
