import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listRestaurantOwners } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"

const restaurantOwnerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listRestaurantOwners)
     const {loading, success, restaurantOwners} = res
    useEffect( () => {
        if (restaurantOwners.items.length === 0)
            dispatch(listRestaurantOwners());
     }, [dispatch]);

    return (
        <div id="restaurantOwnersTable">
            {!loading && success && [restaurantOwners.items.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('restaurantOwners')})}</h1>: <UsersTable users={restaurantOwners.items} editPath="restaurant_owners"></UsersTable>]}
            {!loading && !success && <h4 id='restaurantOwnersHeader'>Restoran sahiplerinin verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default restaurantOwnerList;