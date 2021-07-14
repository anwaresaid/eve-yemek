import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import Header from "../../components/InTableComponents/Header";
import StandardTable from "../../components/StandardTable";
import { i18n } from "../../language";
import { getUntransferedPayments } from "../../store/actions/payments.action";
import PaymentsService from "../../store/services/payments.service";

const Transfers = () => {

    let toast = useRef(null)

    const [globalFilter, setGlobalFilter] = useState(null);

    const dispatch = useDispatch()
    let paymentsService = new PaymentsService

    const untransferedPaymentsState = useSelector((state: RootState) => state.untransferedPayments);
    const { loading, success, payments } = untransferedPaymentsState;

    const makeTransferButton = (row) => {
        return <Button label={i18n.t('executeTransfer')} className="p-button-secondary p-button-outlined" onClick={() => executeTransfer(row.id)} />
    }

    function executeTransfer(id) {
        paymentsService.makeManualTransfer(id)
            .then((res) => {
                toast.current.show({
                    severity: 'info',
                    summary: i18n.t('response'),
                    detail: res
                });
            })
            .catch((error) => {
                toast.current.show({
                    severity: 'error',
                    summary: i18n.t('error'),
                    detail: i18n.t('error')
                });
            })
    }

    let columns = [
        { field: 'id', header: 'ID' },
        { field: 'restaurant', header: i18n.t('restaurant'), body: (row) => <a href={"/restaurants/" + (row.restaurant ? row.restaurant.id : row.restaurant_id.id)} style={{textDecoration: 'none'}}>{ row.restaurant ? row.restaurant.name : row.restaurant_id.name }</a> },
        { field: 'amount', header: i18n.t('totalAmount') },
        { field: 'createdAt', header: i18n.t('created') },
        { field: 'status', header: i18n.t('status') },
        { field: 'gateway_response', header: 'Gateway Response'},
        { header: i18n.t('executeTransfer'), body: (row) => makeTransferButton(row) }
    ]

    useEffect(() => {
        if (!payments) {
            dispatch(getUntransferedPayments())
        }
        console.log(payments)
    }, [payments])

    return (
        <div id="transfersTable">
            <Toast ref={toast}></Toast>
            <h1 id="transfersHeader">{i18n.t('transfers')}</h1>
            <StandardTable
                value={payments}
                header={Header(setGlobalFilter, "Transfers")}
                columns={columns}
                globalFilter={globalFilter}
                emptyMessage={i18n.t('noXfound', {x: i18n.t('transfers')})}
            >
            </StandardTable>
        </div>
    )
}

export default Transfers;