<<<<<<< HEAD
import React, { useState,useEffect } from "react"
import AddonsTable from "../../components/tables/addonsTable"
import { listAddons } from "../../store/actions/addons.action"
import { listAddonCategory } from "../../store/actions/addon-category.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import Loading from "../../components/Loading"
import { i18n } from "../../language"

=======
import React, { useState, useEffect } from 'react';
import AddonsTable from '../../components/tables/addonsTable';
import { listAddons } from '../../store/actions/addons.action';
import { listAddonCategory } from '../../store/actions/addon-category.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Loading from '../../components/Loading';
>>>>>>> eda3000ffa11624e5a66e8a0c0930781e5cc8bf6

const restaurantOwnerList = () => {
  const dispatch = useDispatch();

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
      {!loading && success && successCat && (
        <AddonsTable
          addons={addons.items}
          addonCat={addonCat.items}
        ></AddonsTable>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default restaurantOwnerList;
