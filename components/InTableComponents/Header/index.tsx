import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { i18n } from "../../../language";

const Index = (setGlobalFilter, name, statusFilter = null) => {
    return (
        <div id='tableHeader' className="table-header">
            {i18n.t('listOfX', { x: name })}
            {statusFilter ? statusFilter() : ''}
            <span id='tableIcon' className="p-input-icon-left">
                <i id='tableSearchIcon' className="pi pi-search" />
                <InputText id='tableSearch' type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    );
};
export default Index