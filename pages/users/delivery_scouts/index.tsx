import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listDeliveryScouts } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"

const deliveryScoutList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listDeliveryScouts)
    const {loading, success, deliveryScouts} = res

    useEffect( () => {
        if (deliveryScouts.items.length === 0)
            dispatch(listDeliveryScouts());
     }, [dispatch]);

    return (
        <div id="deliveryScoutsTable">
            {!loading && success && deliveryScouts && <UsersTable users={deliveryScouts.items} editPath="delivery_scouts"></UsersTable>}
            {!loading && !success && <h4 id='deliveryScoutsHeader'>Kargocuların verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default deliveryScoutList;