import React, { useState, useEffect } from 'react';
import { listRestaurant } from "../../store/actions/restaurant.action";
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import RestaurantsTable from '../../components/tables/restaurantsTable';
import Loading from '../../components/Loading';
import { i18n } from '../../language';
const Index = () => {
    const dispatch = useDispatch();
    const resList = useSelector((state: RootState) =>  state.listRestaurant);
    const {loading, success, restaurants} = resList;

    useEffect(() => {
        // restaurantService.getRestaurants().then(data => setRestaurants(data.items));
      
        dispatch(listRestaurant());

        }, [dispatch]);

    return (
        <div id="restaurantsTable">
           
            {!loading && restaurants &&<> <h1 id="restaurantsHeader">{i18n.t('restaurants')}</h1><RestaurantsTable restaurants={restaurants.items}></RestaurantsTable> </>}
            {loading&& <Loading />}

        </div>
    );
}
export default Index;
