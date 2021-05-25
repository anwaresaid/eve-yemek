import React, { useState,useEffect } from "react"
import UsersTable from "../../../components/UsersTable/index"
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
     }, [dispatch]);

    useEffect(() => {
        if(success){
            setUsers(restaurantOwners.items);
        }
    }, [success])

    return (
        <div>
            {!loading && <UsersTable users={users} editPath="restaurant_owners"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;