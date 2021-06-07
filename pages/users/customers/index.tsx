import React, { useState,useEffect } from "react";
import UsersTable from "../../../components/tables/usersTable";
import { listCustomers } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';

const customerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listCustomers);
    const {loading, success, customers} = res;

    useEffect( () => {
        if (customers.items.length === 0)
            dispatch(listCustomers());
     }, [dispatch]);
     
    return (
        <div id="customersTable">
            {!loading && success && <UsersTable users={customers.items} editPath="customers"></UsersTable>}
            {!loading && !success && <h4>Müşterilerin verileri alınamadı!</h4>}
            {loading && <ProgressSpinner/>}
        </div>
    );
}

export default customerList;