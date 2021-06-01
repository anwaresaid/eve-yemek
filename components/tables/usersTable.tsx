import React, { useEffect, useState } from "react";
import StandardTable from '../StandardTable'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';

import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";


const UsersTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    
    const router = useRouter();
    var path;

    const header =(
        <div className="table-header">
            List of Users
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const columns = [
        {field: 'name', header: 'Ad'},
        {field: 'email', header: 'E-Posta'},
        {field: 'phone', header: 'Telefon'},
        {field: 'howLongAgo', header: 'Oluşturma'}, // in days
        {field: 'active', header: 'Aktif', body: ()=>activeTag(true)}, // change after BE supports active status for users
        {field: 'ops', header: 'İşlemler', body: (rowData) =>editButton(rowData,router,path='users/'+props.editPath)}
    ]
    return (
        <StandardTable 
            header={header}
            columns={columns} 
            value={props.users}  
            globalFilter={globalFilter} 
            emptyMessage="No users found" >     
        </StandardTable>
    )
}

export default UsersTable;