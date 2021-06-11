import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listCustomerService } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"

const restaurantOwnerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listCustomerService)
    const {loading, success, customerService} = res

    useEffect( () => {
        if (customerService.items.length === 0)
            dispatch(listCustomerService())
     }, [dispatch]);

    return (
        <div id="customerServiceTable">
            {!loading && success && <UsersTable users={customerService.items} editPath="customer_service"></UsersTable>}
            {!loading && !success && <h4 id='warning'>Müşteri hizmetlerinin verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default restaurantOwnerList;