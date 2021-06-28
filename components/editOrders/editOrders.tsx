import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import DropDown from '../editData/dropDown';
import { Button } from "primereact/button";
import { i18n } from "../../language";
import OrdersService from "../../store/services/orders.service";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from "react-redux";
import { ordersTypes } from "../../store/types/orders.type";
import { findOrder } from "../../store/actions/orders.action";
import { parseDateInOneRow } from "../../helpers/dateFunctions";

const EditOrderPage = (props) => {
    const dispatch = useDispatch();
    let ordersService = new OrdersService()
    const [currentOrderStatus, setCurrentOrderStatus] = useState(props.orderData?.status);
    const [currentDeliveryStatus, setCurrentDeliveryStatus] = useState(props.orderData?.delivery_status);
    const orderStatusOptions = [
        { label: i18n.t('orderPlaced'), value: 'placed' },
        { label: i18n.t('orderAccepted'), value: 'accepted' },
        { label: i18n.t('orderPrepared'), value: 'prepared' },
        { label: i18n.t('cancelled'), value: 'canceled' }
    ];
    const deliveryStatusOptions = [
        { label: i18n.t('picked'), value: 'picked' },
        { label: i18n.t('delivered'), value: 'delivered' },
        { label: i18n.t('cancelled'), value: 'canceled' }
    ]
    const onChangeOrderStatus = (e) => {
        let oldStatus = currentOrderStatus
        setCurrentOrderStatus('loading')
        ordersService.updateOrderStatus(props.orderData.order, e.value)
            .then((res) => {
                setCurrentOrderStatus(e.value);
                dispatch({
                    type: ordersTypes.ORDER_LIST_UPDATE,
                    payload: parseDateInOneRow(res)
                })

            })
            .catch((err) => {
                setCurrentOrderStatus(oldStatus)
            })

    }
    const onChangeDeliveryStatus = (e) => {
        let oldStatus = currentDeliveryStatus
        setCurrentDeliveryStatus('loading')
        ordersService.updateDeliveryStatus(props.orderData.order, e.value)
            .then((res) => {
                setCurrentDeliveryStatus(e.value);
            })
            .catch((err) => {
                setCurrentDeliveryStatus(oldStatus)
            })

    }
    return (
        <div>
            {
                currentOrderStatus &&
                <DropDown
                    id='orderStatusDropdown'
                    value={currentOrderStatus}
                    options={orderStatusOptions}
                    onChange={onChangeOrderStatus}
                    placeHolder={currentOrderStatus === 'loading' ? i18n.t('loading') : i18n.t('orderStatus')}
                    label={i18n.t('orderStatus')}
                />
            }
            {
                currentDeliveryStatus &&
                <DropDown
                    id='deliveryStatusDropdown'
                    value={currentDeliveryStatus}
                    options={deliveryStatusOptions}
                    onChange={onChangeDeliveryStatus}
                    placeHolder={currentDeliveryStatus === 'loading' ? i18n.t('loading') : i18n.t('deliveryStatus')}
                    label={i18n.t('deliveryStatus')}
                />
            }
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

    );
}

export default EditOrderPage;