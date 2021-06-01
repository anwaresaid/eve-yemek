import React, { useState, useEffect } from 'react';
import AddonsTable from '../../components/tables/addonsTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { listCoupons } from '../../store/actions/coupons.action';
import CouponsTable from '../../components/tables/couponsTable';

const index = () => {
  const dispatch = useDispatch();

  const res = useSelector((state: RootState) => state.listCoupons);
  const { loading, coupons } = res;

  useEffect(() => {
    if (!coupons) dispatch(listCoupons());
  }, [dispatch]);

  return (
    <div>
      {!loading && coupons && <CouponsTable coupons={coupons.items} />}
      {loading && <ProgressSpinner />}
    </div>
  );
};

export default index;
