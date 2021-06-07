
import React, { useEffect, useState } from "react";
import StandardTable from '../StandardTable';
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';

const AddonsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const path= 'addons';
    
    const router = useRouter();

    const CategoryBodyTemplate = (rowData)  => {
        let categoryName = props.addonCat.filter(cat => {return cat.id.localeCompare(rowData.addOn_category_id)==0;})
        return categoryName;
         }

 
    
    const columns = [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Ad'},
        {field: 'add_on_category_id', header: 'Kategori', body: CategoryBodyTemplate},
        {field: 'price', header: 'Fiyat', body: priceBodyTemplate}, 
        {field: 'active', header: 'Aktif', body: (rowData)=>activeTag(rowData.active)},
        {field: 'ops', header: 'İşlemler', body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return (
        <StandardTable 
            header={Header(setGlobalFilter,"Addons")}
            columns={columns} 
            value={props.addons}  
            globalFilter={globalFilter} 
            emptyMessage="No users found" >     
        </StandardTable>
    )
}

export default AddonsTable;