import React, { useState, useEffect } from 'react';
import RestaurantsTable from '../../components/tables/restaurantsTable';
import { i18n } from '../../language';
import _ from 'lodash';
import RestaurantService from "../../store/services/restaurants.service";

const Index = () => {

    const restaurantService = new RestaurantService();

    const fetch = (offset, limit, fields = null, text = null) => {
        return new Promise((resolve, reject) => {
            restaurantService.getRestaurants(offset, limit, fields, text)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    return (
        <div id="restaurantsTable">
            <h1 id="restaurantsHeader">{i18n.t('restaurants')}</h1>
            <RestaurantsTable
                fetch={fetch}>
            </RestaurantsTable>
        </div>
    );
}

export default Index;
