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
import { baseUrl } from "../../helpers/constants";

const Food_CategoriesTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'food_categories';


    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`}  alt={rowData.image}/>
   }
 
   
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'image', header: i18n.t('image'), body: imageBodyTemplate},
        {field: 'name', header: i18n.t('name')},
        {field: 'country', header: i18n.t('country')},
        {field: 'status', header: i18n.t('status'), body: (rowData)=>activeTag(rowData.active)},
        {field: '', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return(
        
        <StandardTable
                    header={Header(setGlobalFilter, i18n.t('mealCategories'))}
                    columns={columns} 
                    value={props.foodCategories}  
                    globalFilter={globalFilter} 
                    emptyMessage={i18n.t('noXfound', {x: i18n.t('mealCategories')})} >  
        </StandardTable>
    )

}

export default Food_CategoriesTable;
