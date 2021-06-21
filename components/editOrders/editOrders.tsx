import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import DropDown from '../editData/dropDown';
import { Button } from "primereact/button";
import { i18n } from "../../language";
import OrdersService from "../../store/services/orders.service";
import { ProgressSpinner } from "primereact/progressspinner";

const EditOrderPage = (props) => {
    let ordersService = new OrdersService()
    const [currentStatus, setCurrentStatus] = useState(props.order?.status);
    const statusOptions = [
        { label: i18n.t('orderPlaced'), value: 'placed' },
        { label: i18n.t('orderAccepted'), value: 'accepted' },
        { label: i18n.t('orderPrepared'), value: 'prepared' },
        { label: i18n.t('onTheWay'), value: 'on-the-way' },
        { label: i18n.t('delivered'), value: 'delivered' },
        { label: i18n.t('cancelled'), value: 'canceled'}
    ];
    const onChangeStatus = (e) => {
        let oldStatus = currentStatus
        setCurrentStatus('loading')
        ordersService.updateStatus(props.order.id, e.value)
            .then((res) => {
                setCurrentStatus(e.value);
            })
            .catch((err) => {
                setCurrentStatus(oldStatus)
            })

    }
    return (
        <div>
            {currentStatus &&
                <div id='dropDownDiv'>
                    <DropDown
                            id='statusDropdown'
                            value={currentStatus}
                            options={statusOptions}
                            onChange={onChangeStatus}
                            placeHolder={currentStatus === 'loading' ? i18n.t('loading') : i18n.t('orderStatus')}
                            label={i18n.t('orderStatus')}
                        />

                    <DropDown
                        id='paymentStatusDropdown'
                        placeHolder={i18n.t('paymentStatus')}
                        label={i18n.t('paymentStatus')}
                        emptyMessage={i18n.t('notSupported')}
                    />
                    <DropDown
                        id='deliveryScoutAssignmentDropdown'
                        placeHolder={i18n.t('deliveryScoutAssignment')}
                        label={i18n.t('deliveryScoutAssignment')}
                        emptyMessage={i18n.t('notSupported')}
                    />
                </div>
            }
        </div>

    );
}

export default EditOrderPage;