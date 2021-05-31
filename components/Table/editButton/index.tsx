import React, { useEffect, useState } from "react"
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import {useRouter} from 'next/router';

export default  (rowData,router,path) => {

    
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={()=>{router.push(`/${path}/${rowData._id}`)}}/>
            </React.Fragment>
        );
    }

