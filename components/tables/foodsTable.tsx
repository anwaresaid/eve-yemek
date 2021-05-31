import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import editButton from "../Table/editButton";

const FoodsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'foods';

    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
   }
   const statusBodyTemplate = (rowData) => {
    if(rowData.active == true)
    {
        return <Tag className="p-mr-2" severity="success" value="True" rounded></Tag>;

    }
    else
    { 
        return <Tag severity="danger" value="False" rounded></Tag>;
    }
}
// global filter
    const header =(
        <div className="table-header">
            List of Food
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const formatCurrency = (value) => {
        return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'image', header: "Resim", body: imageBodyTemplate},
        {field: 'name', header: 'Ad'},
        {field: 'food_category.name', header: 'Kategory'},
        {field: 'price', header: 'Fiyat', body: priceBodyTemplate}, // in days
        {field: 'ops', header: 'aktif', body: statusBodyTemplate},
        {field: '', header: 'Islemler', body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return(
        <StandardTable
                    header={header}
                    columns={columns} 
                    value={props.foods}  
                    globalFilter={globalFilter} 
                    emptyMessage="No food found" >  
        </StandardTable>
    )

}

export default FoodsTable;