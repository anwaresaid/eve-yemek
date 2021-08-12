import React, { useEffect, useState } from "react";
import StandardTable from '../StandardTable'
import { useRouter } from 'next/router';
import Header from '../InTableComponents/Header';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import _ from 'lodash'
import { i18n } from "../../language";
import SSPaginatorTable from "../SSPaginatorTable";

const UsersTable = (props) => {
    const router = useRouter();
    var path;

    const columns = [
        { field: 'name', header: i18n.t('name') },
        { field: 'email', header: i18n.t('email') },
        { field: 'phone', header: i18n.t('telephone') },
        { field: 'howLongAgo', header: i18n.t('created') }, 
        { field: 'active', header: i18n.t('active'), body: (rowData) => activeTag(rowData.active) }, // change after BE supports active status for users
        { field: 'ops', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, path = 'users/' + props.editPath) }
    ]

    return (
        <div>
            <SSPaginatorTable
                headerText={i18n.t('listOfX', { x: props.userType })}
                columns={columns}
                fetch={props.fetch}
                emptyMessage={i18n.t('noXfound', { x: props.userType })}>
            </SSPaginatorTable>
        </div>

    )
}

export default UsersTable;