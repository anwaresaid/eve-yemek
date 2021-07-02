import React, { useEffect, useState } from "react";
import StandardTable from '../StandardTable'
import {useRouter} from 'next/router';
import Header from '../InTableComponents/Header';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import _ from 'lodash'
import { i18n } from "../../language";


const UsersTable = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    
    const router = useRouter();
    var path;
    const columns = [
        {field: 'name', header: i18n.t('name')},
        {field: 'email', header: i18n.t('email')},
        {field: 'phone', header: i18n.t('telephone')},
        {field: 'howLongAgo', header: i18n.t('created')}, // in days
        {field: 'active', header: i18n.t('active'), body: ()=>activeTag(true)}, // change after BE supports active status for users
        {field: 'ops', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,path='users/'+props.editPath)}
    ]
    return ( 
        <div>
            <StandardTable 
                header={Header(setGlobalFilter, i18n.t(props.userType))}
                columns={columns} 
                value={_.without(_.map(props.users, (item) => {if (!item.is_deleted) return item}), undefined)}  
                globalFilter={globalFilter} 
                emptyMessage={i18n.t('noXfound', {x: props.userType})}>     
            </StandardTable>
        </div>

    )
}

export default UsersTable;