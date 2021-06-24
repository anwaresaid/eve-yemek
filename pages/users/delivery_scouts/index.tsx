import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listDeliveryScouts } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"

const deliveryScoutList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listDeliveryScouts)
    const {loading, success, deliveryScouts} = res

    useEffect( () => {
            dispatch(listDeliveryScouts());
     }, [dispatch]);

    return (
        <div id="deliveryScoutsTable">
            {!loading && success && deliveryScouts && [deliveryScouts.items.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('deliveryScouts')})}</h1>: <UsersTable users={deliveryScouts.items} editPath="delivery_scouts" userType={i18n.t("deliveryScouts")}></UsersTable>]}
            {!loading && !success && <h4 id='deliveryScoutsHeader'>Kargocuların verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default deliveryScoutList;