import React, { useState,useEffect } from "react";
import UsersTable from "../../../components/UsersTable/index"
import { listCustomers } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';

const customerList = () => {

    const [users, setUsers] = useState([]);
    const [first1, setFirst1] = useState(0);
    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.usersLists);
    const {loading, success, users: allUsers} = res;

    useEffect( () => {
        if (!allUsers)
            dispatch(listCustomers());
     }, [dispatch]);

    useEffect(() => {
        if(success)
            setUsers(allUsers.items);
    }, [success])

     
    return (
        <div>
            {!loading && <UsersTable users={users}></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    );
}

export default customerList;