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

const AddOnCategoryTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'addon_categories';


   
    const columns = [
        {field: 'id', header: "ID"},
        {field: 'name', header: i18n.t('name')},
        {field: 'enum', header: i18n.t('type')},
        {field: '', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,path)}
    ]
    
    return(
        
        <StandardTable
                    header={Header(setGlobalFilter, i18n.t('addonCategories'))}
                    columns={columns} 
                    value={props.addonCategories}  
                    globalFilter={globalFilter} 
                    emptyMessage={i18n.t('noXfound', {x: i18n.t('addonCategories')})} >  
        </StandardTable>
    )

}

export default AddOnCategoryTable;
