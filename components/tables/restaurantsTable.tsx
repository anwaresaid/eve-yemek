import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';
import { i18n } from "../../language";

const RestaurantsTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'restaurants';


    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
   }   
   
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'image', header: i18n.t('image'), body: imageBodyTemplate},
        {field: 'name', header: i18n.t('name')},
        {field: 'owner.name', header: i18n.t('restaurantOwner')},
        {field: '', header: i18n.t('country')},
        {field: 'ops', header: i18n.t('status'), body: (rowData)=>activeTag(rowData.active)},
        {field: '', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,path)}
    ]

    return(
        
        <StandardTable

                    header={Header(setGlobalFilter,"restaurants")}
                    columns={columns} 
                    value={props.restaurants}  
                    globalFilter={globalFilter} 
                    emptyMessage="No food found" >  
        </StandardTable>
    )

}

export default RestaurantsTable;
