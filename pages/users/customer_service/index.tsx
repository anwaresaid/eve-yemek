import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listCustomerService } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import { ProgressSpinner } from 'primereact/progressspinner'

const restaurantOwnerList = () => {
    const [users, setUsers] = useState([])

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listCustomerService)
    const {loading, success, customerService} = res

    useEffect( () => {
        if (customerService.items.length === 0)
            dispatch(listCustomerService())
        else if (success)
            setUsers(customerService.items)
     }, [dispatch, success]);

    return (
        <div>
            {!loading && <UsersTable users={users} editPath="customer_service"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;