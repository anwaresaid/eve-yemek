import React, { useState, useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable";
import { parseDateInAllRows } from "../../../helpers/dateFunctions";
import { i18n } from "../../../language"
import UsersListsService from "../../../store/services/userslists.service"

const deliveryScoutList = () => {

    const usersListsService = new UsersListsService();

    const fetch = (...args) => {
        return usersListsService.getUsersByRole('delivery_scout', ...args)
    }

    return (
        <div id="customersTable">
            <UsersTable fetch={fetch} editPath="delivery_scouts" userType={i18n.t('deliveryScouts')}>
            </UsersTable>
        </div>
    )
}

export default deliveryScoutList;