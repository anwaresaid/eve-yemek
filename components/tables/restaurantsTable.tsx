import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';

const RestaurantsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'restaurants';


    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
   }
 
    const header =(
        <div className="table-header">
            List of restaurants
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

   
   
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'image', header: "Resim", body: imageBodyTemplate},
        {field: 'name', header: 'Ad'},
        {field: 'owner.name', header: 'Sahibinin Adı'},
        {field: '', header: 'Ulke'},
        {field: 'ops', header: 'aktif', body: (rowData)=>activeTag(rowData.active)},
        {field: '', header: 'Islemler', body: (rowData) =>editButton(rowData,router,path)}
    ]

    return(
        
        <StandardTable

                    header={Header(setGlobalFilter,"Food")}
                    columns={columns} 
                    value={props.restaurants}  
                    globalFilter={globalFilter} 
                    emptyMessage="No food found" >  
        </StandardTable>
    )

}

export default RestaurantsTable;
