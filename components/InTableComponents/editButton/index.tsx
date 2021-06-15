import React, { useEffect, useState } from "react"
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import {useRouter} from 'next/router';

const editButton = (rowData,router,path) => {

    
        return (
            <React.Fragment>
                <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={()=>{router.push(`/${path}/${rowData.id}`)}}/>
            </React.Fragment>
        );
}

export default editButton;

