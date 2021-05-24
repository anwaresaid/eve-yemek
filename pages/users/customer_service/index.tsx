import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/UsersTable/index"
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
        if (!customerService)
            dispatch(listCustomerService());
     }, [dispatch]);

    useEffect(() => {
        if(success){
            setUsers(customerService.items);
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