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
    const res = useSelector((state:RootState) => state.listCustomers);
    const {loading, success, customers} = res;

    useEffect( () => {
        if (!customers)
            dispatch(listCustomers());
     }, [dispatch]);

    useEffect(() => {
        if(success)
            setUsers(customers.items);
    }, [success])

     
    return (
        <div>
            {!loading && <UsersTable users={users} role="customers"></UsersTable>}
            {loading && <ProgressSpinner/>}
        </div>
    );
}

export default customerList;