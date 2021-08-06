import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import BackBtn from '../../components/backBtn';
import { listDeliveryDetails } from '../../store/actions/deliveries.action';

const DeliveryDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const detailsData = useSelector((state: RootState) => state.findOrder);
  const { loading, success, deliveryDetails } = detailsData;

  useEffect(() => {
    dispatch(listDeliveryDetails(router.query.id))
}, [dispatch])

  return (
    <div>
      <BackBtn router={router}/>
    </div>
  )
}

export default DeliveryDetail
