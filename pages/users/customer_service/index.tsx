import React, { useState, useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { parseDateInAllRows } from "../../../helpers/dateFunctions"
import { i18n } from "../../../language"
import UsersListsService from "../../../store/services/userslists.service"

const customerServiceList = () => {

    const usersListsService = new UsersListsService();

    const fetch = (...args) => {
        return usersListsService.getUsersByRole('customer_service', ...args)
    }

    return (
        <div id="customerServiceTable">
            <UsersTable fetch={fetch} editPath="customer_service" userType={i18n.t('customerServiceReps')}>
            </UsersTable>

        </div>
    )
}

export default customerServiceList;