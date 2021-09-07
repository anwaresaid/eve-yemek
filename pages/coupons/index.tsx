import React, { useState, useEffect } from 'react';
import { i18n } from '../../language';
import activeTag from '../../components/InTableComponents/activeTag';
import SSPaginatorTable from '../../components/SSPaginatorTable';
import CouponService from '../../store/services/coupons.service';
import { detailedDate } from '../../helpers/dateFunctions';
import editButton from '../../components/InTableComponents/editButton';
import auth from '../../helpers/core/auth';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const couponsService = new CouponService();
  const path = 'coupons'
  const columns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'coupon_code', header: i18n.t('couponCode'), filter: true, filterType: 'search', sortable: true },
    { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search', sortable: true },
    { field: 'description', header: i18n.t('description'), filter: true, filterType: 'search', sortable: true },
    { field: 'expire_date', header: i18n.t('expiration'), body: row => detailedDate(row.expire_date), sortable: true },
    { field: 'discount_type', header: i18n.t('couponType'), sortable: true },
    { field: 'discount', header: i18n.t('discount'), sortable: true },
    { field: 'max_usage', header: i18n.t('maximumUsage'), sortable: true },
    { field: 'times_used', header: i18n.t('timesUsed'), sortable: true },
    {
      field: 'active',
      header: i18n.t('active'),
      body: (rowData) => activeTag(rowData.active),
    },
    auth.user.roles=='admin'|| auth.user.roles=='super_admin'||auth.user.roles=='restaurant_owner'?{
      field: 'ops',
      header: i18n.t('operations'),
      body: (rowData) => editButton(rowData, router, path),
    }:'',
  ];

  return (
    <div id="couponsTable">
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('coupons') })}
        fetch={couponsService.getAllCoupons}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('coupons') })}
      />
    </div>
  );
};

export default index;
