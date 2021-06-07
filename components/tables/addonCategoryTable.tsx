import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';

const AddOnCategoryTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'addon_categories';

    const header =(
        <div className="table-header">
            List of Addon Categories
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

   
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'name', header: 'Ad'},
        {field: 'enum', header: 'Tur'},
        {field: '', header: 'Islemler', body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return(
        
        <StandardTable
                    header={Header(setGlobalFilter,"addon Category")}
                    columns={columns} 
                    value={props.addonCategories}  
                    globalFilter={globalFilter} 
                    emptyMessage="No addon Categories found" >  
        </StandardTable>
    )

}

export default AddOnCategoryTable;
