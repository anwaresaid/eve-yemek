import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listCoupons } from '../../store/actions/coupons.action';
import CouponsTable from '../../components/tables/couponsTable';
import Loading from '../../components/Loading';
import { i18n } from '../../language';
import _ from 'lodash'
import BackBtn from '../../components/backBtn';
import { useRouter } from 'next/router';

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const res = useSelector((state: RootState) => state.listCoupons);
  const { loading, coupons } = res;

  useEffect(() => {
    dispatch(listCoupons());
  }, [dispatch]);

  return (
    <div id="couponsTabe">
      {!loading && coupons &&
        <>
          <CouponsTable coupons={_.without(_.map(coupons.items, (item) => { if (!item.is_deleted) return item }), undefined)} />
        </>}
      {loading && <Loading />}
    </div>
  );
};

export default index;
