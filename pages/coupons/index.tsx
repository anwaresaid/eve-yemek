import React, { useState, useEffect } from 'react';
import AddonsTable from '../../components/tables/addonsTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { listCoupons } from '../../store/actions/coupons.action';

const index = () => {
  const dispatch = useDispatch();

  const res = useSelector((state: RootState) => state.listCoupons);
  const { loading, success, coupons } = res;

  useEffect(() => {
    if (!coupons) dispatch(listCoupons());
  }, [dispatch]);

  return (
    <div>
      {!loading && <h2>Table should be here</h2>}
      {loading && <ProgressSpinner />}
    </div>
  );
};

export default index;
