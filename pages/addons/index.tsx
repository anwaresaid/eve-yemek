import React, { useState, useEffect } from "react"
import AddonsTable from "../../components/tables/addonsTable"
import { listAddons } from "../../store/actions/addons.action"
import { listAddonCategory } from "../../store/actions/addon-category.action"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "typesafe-actions"
import _ from 'lodash'
import Loading from "../../components/Loading"
import { i18n } from "../../language"
import BackBtn from "../../components/backBtn";
import {useRouter} from "next/router";


const restaurantOwnerList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const res = useSelector((state: RootState) => state.listAddons);
  const { loading, success, addons } = res;

  const resCat = useSelector((state: RootState) => state.listAddonCategory);
  const { success: successCat, addonCat } = resCat;

  useEffect(() => {
    dispatch(listAddons());
    if (!addonCat) dispatch(listAddonCategory());
  }, [dispatch]);

  return (
    <div id='addonsTabe'>
      {!loading && success && successCat &&
        <>
          <h1 id="addonsHeader">{i18n.t('addons')}</h1>
          <AddonsTable
            addons={_.without(_.map(addons.items, (item) => { if (!item.is_deleted) return item }), undefined)}
            addonCat={_.without(_.map(addonCat.items, (item) => { if (!item.is_deleted) return item }), undefined)}
          ></AddonsTable>
        </>
      }
      {loading && <Loading />}
    </div>
  );
};

export default restaurantOwnerList;
