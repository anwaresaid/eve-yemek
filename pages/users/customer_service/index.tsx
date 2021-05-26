import React, { useState,useEffect } from "react"
<<<<<<< HEAD
import UsersTable from "../../../components/Tables/usersTable"
=======
import UsersTable from "../../../components/tables/usersTable"
>>>>>>> b065b01fb0857a2439668ecb507912b801ce9c1c
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
     }, [dispatch]);

    useEffect(() => {
        if(success){
            setUsers(customerService.items)
        }
    }, [success])

    return (
        <div>
            {!loading && <UsersTable users={users} editPath="customer_service"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;