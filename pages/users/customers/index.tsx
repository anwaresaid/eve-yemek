import React, { useState, useEffect } from "react";
import UsersTable from "../../../components/tables/usersTable";
import { parseDateInAllRows } from "../../../helpers/dateFunctions";
import { i18n } from "../../../language";
import UsersListsService from "../../../store/services/userslists.service";

const customerList = () => {

    const usersListsService = new UsersListsService();

    const fetch = (offset, limit, fields = null, text = null) => {
        return new Promise((resolve, reject) => {
            usersListsService.getUsersByRole('customer', offset, limit)
                .then(res => resolve(parseDateInAllRows(res)))
                .catch(err => reject(err))
        })
    }

    return (
        <div id="customersTable">
            <UsersTable fetch={fetch} editPath="customers" userType={i18n.t('customers')}>
            </UsersTable>

        </div>
    )
}

export default customerList;