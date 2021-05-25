import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/UsersTable/index"
import { listDeliveryScouts } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import { ProgressSpinner } from 'primereact/progressspinner'

const deliveryScoutList = () => {
    const [users, setUsers] = useState([])

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listDeliveryScouts)
    const {loading, success, deliveryScouts} = res

    useEffect( () => {
        if (deliveryScouts.items.length === 0)
            dispatch(listDeliveryScouts());
     }, [dispatch]);

    useEffect(() => {
        if(success){
            setUsers(deliveryScouts.items);
        }
    }, [success])

    return (
        <div>
            {!loading && <UsersTable users={users} editPath="delivery_scouts"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default deliveryScoutList;