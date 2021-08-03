import React, { useState, useEffect } from "react"
import UsersTable from "../../../components/tables/usersTable"
import { listDeliveryScouts } from "../../../store/actions/userslists.action"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../../components/Loading"
import { i18n } from "../../../language"
import StandardTable from "../../../components/StandardTable"
import activeTag from "../../../components/InTableComponents/activeTag"
import editButton from "../../../components/InTableComponents/editButton"
import { useRouter } from "next/router"

const deliveryScoutList = () => {

    const dispatch = useDispatch();
    const res = useSelector((state: RootState) => state.listDeliveryScouts)
    const { loading, success, deliveryScouts } = res

    const router = useRouter();

    useEffect(() => {
        dispatch(listDeliveryScouts());
    }, [dispatch]);

    const columns = [
        { field: 'name', header: i18n.t('name') },
        { field: 'email', header: i18n.t('email') },
        { field: 'phone', header: i18n.t('telephone') },
        { field: 'howLongAgo', header: i18n.t('created') }, // in days
        { field: 'active', header: i18n.t('active'), body: (rowData) => activeTag(rowData.active) }, 
        { field: 'delivery_count', header: i18n.t('deliveryCount')},
        { field: 'ops', header: i18n.t('operations'), body: (rowData) =>editButton(rowData,router,'users/delivery_scouts')}
    ]

    return (
        <div id="deliveryScoutsTable">
            {!loading && success && deliveryScouts && [deliveryScouts.length == 0 ? <h1>{i18n.t('noXfound', { x: i18n.t('deliveryScouts') })}</h1> : <StandardTable columns={columns} value={deliveryScouts}></StandardTable>]}
            {!loading && !success && <h4 id='deliveryScoutsHeader'>Kargocuların verileri alınamadı!</h4>}
            {loading && <Loading />}
        </div>
    )
}

export default deliveryScoutList;