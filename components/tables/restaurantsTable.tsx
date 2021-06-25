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
            <S.Image className="imageCol" src={`${rowData.image}`}  alt={rowData.image}/>
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
   const StatusBodyTemplate = (rowData) => {
    return (
        <div>

            <React.Fragment>
                <span className="p-column-title"> {i18n.t('status') } </span>
                <span> {activeTag(rowData.active)}</span>
            </React.Fragment>
        </div>
    );
}
   
   const editBodyTemplate = (rowData) => {
    return (
        <div>

            <React.Fragment>
                <span className="p-column-title"> {i18n.t('operations') } </span>
                <span> {editButton(rowData,router,path)}</span>
            </React.Fragment>
        </div>
    );
}
   
    const columns = [
        {field: 'id', header: "ID", body:IdBodyTemplate},
        {field: 'image', header: i18n.t('image'), body: imageBodyTemplate},
        {field: 'name', header: i18n.t('name'), body:NameBodyTemplate},
        {field: 'owner.name', header: i18n.t('restaurantOwner'), body:OwnerBodyTemplate},
        {field: '', header: i18n.t('country'),body:CountryBodyTemplate},
        {field: 'ops', header: i18n.t('status'), body: StatusBodyTemplate},
        {field: '', header: i18n.t('operations'), body:editBodyTemplate}
    ]

    return(
        
        <StandardTable

                    header={Header(setGlobalFilter, i18n.t('restaurants'))}
                    columns={columns} 
                    value={props.restaurants}  
                    globalFilter={globalFilter} 
                    emptyMessage={i18n.t('noXfound', {x: i18n.t('restaurants')})} >  
        </StandardTable>
    )

}

export default RestaurantsTable;
