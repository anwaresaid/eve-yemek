import React, { useState, useEffect } from 'react';
import AddonsTable from '../../components/tables/addonsTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listCoupons } from '../../store/actions/coupons.action';
import CouponsTable from '../../components/tables/couponsTable';
import Loading from '../../components/Loading';
import { i18n } from '../../language';

const index = () => {
  const dispatch = useDispatch();

  const res = useSelector((state: RootState) => state.listCoupons);
  const { loading, coupons } = res;

  useEffect(() => {
    if (!coupons) dispatch(listCoupons());
  }, [dispatch]);

  return (
    <div id="couponsTabe">
      {!loading && coupons &&<> <h1 id="couponsHeader">{i18n.t('coupons')}</h1> <CouponsTable coupons={coupons.items}/></>}
      {loading && <Loading />}
    </div>
  );
};

export default index;
