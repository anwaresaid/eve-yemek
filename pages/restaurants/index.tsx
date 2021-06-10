import React, { useState, useEffect } from 'react';
import { listRestaurant } from "../../store/actions/restaurant.action";
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import RestaurantsTable from '../../components/tables/restaurantsTable';
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
            {!loading && restaurants &&<RestaurantsTable restaurants={restaurants.items}></RestaurantsTable> }
            {loading&& <ProgressSpinner/>}

        </div>
    );
}
export default Index;
