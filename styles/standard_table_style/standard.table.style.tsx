import React from 'react'
import styled from "styled-components";
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

export const Table = styled(DataTable)`
    .datatable-filter-demo .p-paginator .p-paginator-current {
    margin-right: auto !important;
}
.table-header {
    display: flex;
    justify-content: space-between;
}

td{
    word-wrap:break-word
}

`;

export const editTagTemplate = (onClick, icon='pi-pencil') => {
    return (
        <React.Fragment>
            <Button icon={"pi " + icon} className="p-button-rounded p-button-outlined" onClick={onClick}/>
        </React.Fragment>
    );
}

export const activeTagTemplate = (activeStatus) => {
    return (
        <Tag 
            value={activeStatus ? "Aktif" : "engelli"} 
            severity={activeStatus ? "primary" : "warning"}
            icon={activeStatus ? "pi pi-check" : "pi pi-exclamation-triangle"}
        >
        </Tag>
    )
}
