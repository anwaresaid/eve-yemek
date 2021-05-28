import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listCustomerService } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import { ProgressSpinner } from 'primereact/progressspinner'

const restaurantOwnerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listCustomerService)
    const {loading, success, customerService} = res

    useEffect( () => {
        if (customerService.items.length === 0)
            dispatch(listCustomerService())
     }, [dispatch]);

    return (
        <div>
            {!loading && success && <UsersTable users={customerService.items} editPath="customer_service"></UsersTable>}
            {!loading && !success && <h4>Müşteri hizmetlerinin verileri alınamadı!</h4>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;