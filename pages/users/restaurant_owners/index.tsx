import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listRestaurantOwners } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import { ProgressSpinner } from 'primereact/progressspinner'

const restaurantOwnerList = () => {
    const [users, setUsers] = useState([])

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listRestaurantOwners)
    const {loading, success, restaurantOwners} = res

    useEffect( () => {
        if (restaurantOwners.items.length === 0)
            dispatch(listRestaurantOwners());
        else if (success)
            setUsers(restaurantOwners.items);
     }, [dispatch, success]);

    return (
        <div>
            {!loading && <UsersTable users={users} editPath="restaurant_owners"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;