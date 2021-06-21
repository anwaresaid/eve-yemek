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
        return(
            <React.Fragment>
            <span className="p-column-title"> {i18n.t('image')}</span>
            <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
            </React.Fragment>
            )   
   }   
   const IdBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">ID</span>
            {rowData.id}
        </React.Fragment>
    );
}
   const NameBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title"> {i18n.t('name')}</span>
            {rowData.name}
        </React.Fragment>
    );
}
   const OwnerBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title"> {i18n.t('restaurantOwner')}</span>
            {rowData.owner && rowData.owner.name}
        </React.Fragment>
    );
}
   const CountryBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title"> {i18n.t('country')}</span>
        </React.Fragment>
    );
}
   
    const columns = [
        {field: 'id', header: "ID", body:IdBodyTemplate},
        {field: 'image', header: i18n.t('image'), body: imageBodyTemplate},
        {field: 'name', header: i18n.t('name'), body:NameBodyTemplate},
        {field: 'owner.name', header: i18n.t('restaurantOwner'), body:OwnerBodyTemplate},
        {field: '', header: i18n.t('country'),body:CountryBodyTemplate},
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
