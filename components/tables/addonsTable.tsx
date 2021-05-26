
import React, { useEffect, useState } from "react";
import StandardTable from '../StandardTable'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import {activeTagTemplate} from '../../styles/standard_table_style/standard.table.style'
import { Button } from "primereact/button";

const AddonsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    
    const router = useRouter();

    const actionBodyTemplate = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={()=>{router.push(`/addons/${rowData._id}`)}}/>
            </React.Fragment>
        );
    }

    const activeTag = (rowData) => {
        return (
            activeTagTemplate(rowData.active)
        )
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const CategoryBodyTemplate = (rowData)  => {
        let categoryName = props.addonCat.filter(cat => {return cat._id.localeCompare(rowData.addOn_category_id)==0;})
        return categoryName;
         }

    const header =(
        <div className="table-header">
            List of Addons
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const columns = [
        {field: '_id', header: 'ID'},
        {field: 'name', header: 'Ad'},
        {field: 'addOn_category_id', header: 'Kategori', body: CategoryBodyTemplate},
        {field: 'price', header: 'Fiyat', body: priceBodyTemplate}, // in days
        {field: 'active', header: 'Aktif', body: activeTag},
        {field: 'ops', header: 'İşlemler', body: actionBodyTemplate}
    ]

    return (
        <StandardTable 
            header={header}
            columns={columns} 
            value={props.addons}  
            globalFilter={globalFilter} 
            emptyMessage="No users found" >     
        </StandardTable>
    )
}

export default AddonsTable;