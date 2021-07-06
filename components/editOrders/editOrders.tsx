import React, { useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import DropDown from '../editData/dropDown';
import { Button } from 'primereact/button';
import { i18n } from '../../language';
import OrdersService from '../../store/services/orders.service';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch } from 'react-redux';
import { ordersTypes } from '../../store/types/orders.type';
import { findOrder } from '../../store/actions/orders.action';
import { parseDateInOneRow } from '../../helpers/dateFunctions';
import { Toast } from 'primereact/toast';
import {
  createNotification,
  sendNotifications,
} from '../../store/actions/send_notifications.action';

const EditOrderPage = (props) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  let ordersService = new OrdersService();
  const [currentOrderStatus, setCurrentOrderStatus] = useState(
    props.orderData?.status
  );
  const [currentDeliveryStatus, setCurrentDeliveryStatus] = useState(
    props.orderData?.delivery_status
  );
  const orderStatusOptions = [
    { label: i18n.t('orderPlaced'), value: 'placed' },
    { label: i18n.t('orderAccepted'), value: 'accepted' },
    { label: i18n.t('orderPrepared'), value: 'prepared' },
    { label: i18n.t('cancelled'), value: 'canceled' },
  ];
  const deliveryStatusOptions = [
    { label: i18n.t('picked'), value: 'picked' },
    { label: i18n.t('delivered'), value: 'delivered' },
    { label: i18n.t('cancelled'), value: 'canceled' },
  ];
  console.log('orderData: ', props.orderData);
  const onChangeOrderStatus = (e) => {
    let oldStatus = currentOrderStatus;
    setCurrentOrderStatus('loading');
    ordersService
      .updateOrderStatus(props.orderData.order, e.value)
      .then((res) => {
        setCurrentOrderStatus(e.value);
        dispatch({
          type: ordersTypes.ORDER_LIST_UPDATE,
          payload: props.orderData.order,
        });
        toast.current.show({
          severity: 'success',
          summary: i18n.t('success'),
          detail: i18n.t('updateOrderStatus'),
        });
      })
      .then(() => {
        dispatch(
          createNotification(
            props.orderData.user.id,
            `your order ${props.orderData.order} status now is ${e.value}`
          )
        );
      })
      .then(() => {
        dispatch(
          sendNotifications(
            'order status updated',
            `your order ${props.orderData.order} status now is ${e.value}`,
            props.orderData.user.id
          )
        );
      })
      .catch((err) => {
        setCurrentOrderStatus(oldStatus);
        toast.current.show({
          severity: 'error',
          summary: i18n.t('error'),
          detail: i18n.t('updateOrderStatus'),
        });
      });
  };
  const onChangeDeliveryStatus = (e) => {
    let oldStatus = currentDeliveryStatus;
    setCurrentDeliveryStatus('loading');
    ordersService
      .updateDeliveryStatus(props.orderData.order, e.value)
      .then((res) => {
        setCurrentDeliveryStatus(e.value);
        dispatch({
          type: ordersTypes.ORDER_LIST_UPDATE,
          payload: props.orderData.order,
        });
        toast.current.show({
          severity: 'success',
          summary: i18n.t('success'),
          detail: i18n.t('deliveryStatusUpdated'),
        });
      })
      .then(() => {
        dispatch(
          createNotification(
            props.orderData.user.id,
            `your order ${props.orderData.order} delivery status now is ${e.value}`
          )
        );
      })
      .then(() => {
        dispatch(
          sendNotifications(
            'delivery status updated',
            `your order ${props.orderData.order} delivery status now is ${e.value}`,
            props.orderData.user.id
          )
        );
      })
      .catch((err) => {
        setCurrentDeliveryStatus(oldStatus);
        toast.current.show({
          severity: 'error',
          summary: i18n.t('error'),
          detail: i18n.t('updateDeliveryStatus'),
        });
      });
  };
  return (
    <div>
      <Toast id='toastMessage' ref={toast}></Toast>
      {currentOrderStatus && (
        <DropDown
          id='orderStatusDropdown'
          value={currentOrderStatus}
          options={orderStatusOptions}
          onChange={onChangeOrderStatus}
          placeHolder={
            currentOrderStatus === 'loading'
              ? i18n.t('loading')
              : i18n.t('orderStatus')
          }
          label={i18n.t('orderStatus')}
        />
      )}
      {currentDeliveryStatus && (
        <DropDown
          id='deliveryStatusDropdown'
          value={currentDeliveryStatus}
          options={deliveryStatusOptions}
          onChange={onChangeDeliveryStatus}
          placeHolder={
            currentDeliveryStatus === 'loading'
              ? i18n.t('loading')
              : i18n.t('deliveryStatus')
          }
          label={i18n.t('deliveryStatus')}
        />
      )}
    </div>
  );
};

export default EditOrderPage;
