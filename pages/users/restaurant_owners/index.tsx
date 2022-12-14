import React, { useState, useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listRestaurantOwners } from "../../../store/actions/userslists.action"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"
import UsersListsService from "../../../store/services/userslists.service"
import { parseDateInAllRows } from "../../../helpers/dateFunctions"

const restaurantOwnerList = () => {

    const usersListsService = new UsersListsService();

    const fetch = (...args) => {
        return usersListsService.getUsersByRole('restaurant_owner', ...args)
    }

    return (
        <div id="customersTable">
            <UsersTable fetch={fetch} editPath="restaurant_owners" userType={i18n.t('restaurantOwners')}>
            </UsersTable>

        </div>
    )
}

export default restaurantOwnerList;