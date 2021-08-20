import { useRouter } from 'next/router';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import BackBtn from '../../components/backBtn';
import OrderStatus from '../../components/InTableComponents/orderStatusTag';
import { detailedDate, fromNowDate } from '../../helpers/dateFunctions';
import { i18n } from '../../language';
import { listDeliveryDetails } from '../../store/actions/deliveries.action';
import OrderDivider from "../../components/ordersCard/orderDivider";

const DeliveryDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const detailsData = useSelector(
    (state: RootState) => state.listDeliveryDetails
  );
  const { loading, success, deliveryDetails } = detailsData;


  const priceTag = (price) => {
    return price + ' ' + deliveryDetails.order.currency_type
}

  const mealTableColumns = [
    { field: 'name', header: i18n.t('name') },
    { header: i18n.t('price'), body: (row) => priceTag(row.price) },
    { field: 'quantity', header: i18n.t('quantity') },
    {
      header: i18n.t('total'),
      body: (row) => priceTag(row.quantity * row.price),
    },
  ].map((col, i) => {
    return (
      <Column
        key={i}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable
      />
    );
  });

  useEffect(() => {
    if(router.isReady){
      dispatch(listDeliveryDetails(router.query.id));
    }
  }, [router]);

  return (
    <div>
      <BackBtn router={router} />
      {deliveryDetails && (
        <>
          <Card id='ordersCard' title={deliveryDetails.order?.order_code}>
            <div className='p-grid'>
              {deliveryDetails.order && (
                <div id='detailsDiv' className='p-col'>
                  <div id='fromDiv' className='p-pb-2'>
                    {i18n.t('from')}
                  </div>
                  <div id='nameDiv'>
                    <b>{deliveryDetails.order.restaurant.name}</b>
                  </div>
                  <div id='addressDiv'>
                    <b>{deliveryDetails.order.restaurant.id}</b>
                  </div>
                  <div id='phoneDiv'>
                    {i18n.t('telephone')}:{' '}
                    {deliveryDetails.order.restaurant.phone}
                  </div>
                  <div id='emailDiv'>
                    {i18n.t('email')}: {deliveryDetails.order.restaurant.email}
                  </div>
                </div>
              )}

              {deliveryDetails.user && (
                <div id='detailsDiv' className='p-col'>
                  <div id='fromDiv' className='p-pb-2'>
                    {i18n.t('deliveryScouts')}
                  </div>
                  <div id='nameDiv'>
                    <b>{deliveryDetails.user.name}</b>
                  </div>
                  <div id='addressDiv'>
                    <b>{deliveryDetails.user.address}</b>
                  </div>
                  <div id='phoneDiv'>
                    {i18n.t('telephone')}: {deliveryDetails.user.phone}
                  </div>
                  <div id='emailDiv'>
                    {i18n.t('email')}: {deliveryDetails.user.email}
                  </div>
                </div>
              )}

              {deliveryDetails.order && (
                <div id='detailsDiv' className='p-col'>
                  <div id='fromDiv' className='p-pb-2'>
                    {i18n.t('to')}
                  </div>
                  <div id='nameDiv'>
                    <b>{deliveryDetails.order.user_id.name}</b>
                  </div>
                  <div id='addressDiv'>
                    <b>{deliveryDetails.order.user_id.address}</b>
                  </div>
                  <div id='phoneDiv'>
                    {i18n.t('telephone')}: {deliveryDetails.order.user_id.phone}
                  </div>
                  <div id='emailDiv'>
                    {i18n.t('email')}: {deliveryDetails.order.user_id.email}
                  </div>
                </div>
              )}

              {deliveryDetails.order && (
                <div id='recieptDiv' className='p-col'>
                  <div id='reciepIdtDiv'>
                    <b>{i18n.t('receipt')}:</b>{' '}
                    {deliveryDetails.order.order_code}
                  </div>
                  <div id='orderTimeDiv'>
                    <b>{i18n.t('orderTime')}:</b>{' '}
                    {detailedDate(deliveryDetails.order.createdAt)}
                  </div>
                  <br />
                  <div id='orderIdDiv'>
                    <b>{i18n.t('order')} ID: </b>
                    {deliveryDetails.order.id}
                  </div>
                  <div id='createdAtDiv'>
                    <b>{i18n.t('orderPlaced')}: </b>
                    {fromNowDate(deliveryDetails.order.createdAt)}
                  </div>
                  <br />
                  <div id='orderStatusDiv'>
                    <b>{i18n.t('deliveryStatus')}: </b>
                    {OrderStatus(deliveryDetails.status)}
                  </div>
                  <br />
                </div>
              )}
            </div>

             <div className='p-grid'>
              <div id='dividerDiv' className='p-col'>
                <OrderDivider
                  id='orderDivider'
                  label={i18n.t('paymentGateway')}
                  value={deliveryDetails.order.payment_type}
                />
                <OrderDivider
                  id='notes'
                  label={i18n.t('notes')}
                  value={deliveryDetails.order.notes}
                />
              </div>
              <div id='orderDetailsDiv' className='p-col-5'>
                <div>
                  <OrderDivider
                    id='totalFoodAmount'
                    label={i18n.t('totalEarnings') + ':'}
                    value={priceTag(
                      deliveryDetails.order.total_amount -
                      deliveryDetails.order.delivery_amount -
                      (deliveryDetails.order.restaurant.commission_rate / 100 * deliveryDetails.order.total_amount) -
                      deliveryDetails.order.restaurant.restaurant_charges
                    )}
                  />
                  <OrderDivider
                    id='deliveryAmount'
                    label={i18n.t('restaurantFee')}
                    value={priceTag(deliveryDetails.order.restaurant.restaurant_charges)}
                  />
                  <OrderDivider
                    id='tax'
                    label={i18n.t('commissionRate')}
                    value={`${deliveryDetails.order.restaurant.commission_rate} %`}
                  />
                  <OrderDivider
                    id='deliveryAmount'
                    label={i18n.t('deliveryFee')}
                    value={priceTag(deliveryDetails.order.delivery_amount)}
                  />
                  <OrderDivider
                    id='totalAmount'
                    label={i18n.t('total')}
                    value={priceTag(deliveryDetails.order.total_amount)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DeliveryDetail;
