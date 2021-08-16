import React, { useState, useEffect } from 'react';
import { i18n } from '../../language';
import activeTag from '../../components/InTableComponents/activeTag';
import SSPaginatorTable from '../../components/SSPaginatorTable';
import CouponService from '../../store/services/coupons.service';
import { detailedDate } from '../../helpers/dateFunctions';

const index = () => {

  const couponsService = new CouponService();

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'coupon_code', header: i18n.t('couponCode'), filter: true, filterType: 'search'},
    { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search' },
    { field: 'description', header: i18n.t('description'), filter: true, filterType: 'search' },
    { field: 'expire_date', header: i18n.t('expiration'), body: row => detailedDate(row.expire_date) },
    { field: 'discount_type', header: i18n.t('couponType') },
    { field: 'discount', header: i18n.t('discount') },
    { field: 'max_usage', header: i18n.t('maximumUsage') },
    {
      field: 'active',
      header: i18n.t('active'),
      body: (rowData) => activeTag(rowData.active),
    }
  ];

  const fetch = (offset, limit, fields = null, text = null) => {
    return new Promise((resolve, reject) => {
      couponsService.getAllCoupons(offset, limit, fields, text)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return (
    <div id="couponsTable">
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('coupons') })}
        fetch={fetch}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('coupons') })}
      >
      </SSPaginatorTable>
    </div>
  );
};

export default index;
