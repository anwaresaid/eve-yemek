import React, { useState, useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listRestaurantOwners } from "../../../store/actions/userslists.action"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"

const restaurantOwnerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state: RootState) => state.listRestaurantOwners)
    const { loading, success, restaurantOwners } = res
    useEffect(() => {
        dispatch(listRestaurantOwners());
    }, [dispatch]);

    return (
        <div id="restaurantOwnersTable">
            {!loading && success &&
                <UsersTable users={restaurantOwners.items} editPath="restaurant_owners" userType={i18n.t('restaurantOwners')}>
                </UsersTable>}
            {!loading && !success && <h4 id='restaurantOwnersHeader'>Restoran sahiplerinin verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default restaurantOwnerList;