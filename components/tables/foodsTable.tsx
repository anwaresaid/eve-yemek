import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';
import idColumn from "../InTableComponents/idColumn";

const FoodsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'foods';


    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
   }
 

    const columns = [
        {field: 'id', header: "ID", body:idColumn},
        {field: 'image', header: "Resim", body: imageBodyTemplate},
        {field: 'name', header: 'Ad'},
        {field: 'food_category.name', header: 'Kategory'},
        {field: 'price', header: 'Fiyat', body: priceBodyTemplate}, 
        {field: 'ops', header: 'aktif', body: (rowData)=>activeTag(rowData.active)},
        {field: '', header: 'Islemler', body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return(
        
        <StandardTable
                    header={Header(setGlobalFilter,"Food")}
                    columns={columns} 
                    value={props.foods}  
                    globalFilter={globalFilter} 
                    emptyMessage="No food found" >  
        </StandardTable>
    )

}

export default FoodsTable;
