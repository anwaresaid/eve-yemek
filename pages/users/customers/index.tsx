import React, { useState, useEffect } from "react";
import UsersTable from "../../../components/tables/usersTable";
import { listCustomers } from "../../../store/actions/userslists.action"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "typesafe-actions";
import Loading from "../../../components/Loading";
import { i18n } from "../../../language";

const customerList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state: RootState) => state.listCustomers);
    const { loading, success, customers } = res;

    useEffect(() => {
        dispatch(listCustomers());
    }, [dispatch]);

    return (
        <div id="customersTable">
            {!loading && success &&
                <UsersTable users={customers.items} editPath="customers" userType={i18n.t('customers')}>
                </UsersTable>}
            {!loading && !success && <h4 id='customersTableHeader'>Müşterilerin verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    );
}

export default customerList;