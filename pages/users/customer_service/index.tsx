import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listCustomerService } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"

const customerServiceList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listCustomerService)
    const {loading, success, customerService} = res


    useEffect( () => {
        if (customerService.items.length === 0)
            dispatch(listCustomerService())
     }, [dispatch]);

    return (
        <div id="customerServiceTable">
            
            {!loading && success && [customerService.items.length==0? <h1 id='noCustomerListFoundHeader'>{i18n.t('noXfound',{x:i18n.t('customerServiceReps')})}</h1>: <UsersTable users={customerService.items} editPath="customer_service" userType={i18n.t('customerServiceReps')}></UsersTable>]}
            {!loading && !success && <h4 id='warning'>Müşteri hizmetlerinin verileri alınamadı!</h4>}
            {loading && <Loading />}

        </div>
    )
}

export default customerServiceList;