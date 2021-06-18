import React, { useState,useEffect } from "react";
import UsersTable from "../../../components/tables/usersTable";
import { listCustomers } from "../../../store/actions/userslists.action"
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import Loading from "../../../components/Loading";
import { i18n } from "../../../language";

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
            {!loading && success && [customers.items.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('customers')})}</h1>:  <UsersTable users={customers.items} editPath="customers"></UsersTable>]}
            {!loading && !success && <h4 id='customersTableHeader'>Müşterilerin verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    );
}

export default customerList;