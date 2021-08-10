import React, { useState, useEffect } from 'react';
import { listRestaurant } from "../../store/actions/restaurant.action";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import RestaurantsTable from '../../components/tables/restaurantsTable';
import Loading from '../../components/Loading';
import { i18n } from '../../language';
import _ from 'lodash';
import RestaurantService from "../../store/services/restaurants.service";
import { ProgressSpinner } from 'primereact/progressspinner';

const Index = () => {

    /* This page has been changed to follow a new request structure for pagination purposes. If this does well in testing,
    *  other pages can follow suit. This page does not use the Redux store anymore. It fetches and displays pages on demand.
    */

    const restaurantService = new RestaurantService();
    const [restaurants, setRestaurants] = useState(null)
    const [loadingRestaurants, setLoadingRestaurants] = useState(true)
    const [initialLoading, setInitialLoading] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (!restaurants) {
            fetch(0, 10)
        }
    });

    const fetch = (offset, limit) => {
        setLoadingRestaurants(true)
        restaurantService.getRestaurants(offset, limit).then(res => {
            console.log(res)
            setRestaurants(res)
            setTotal(res.total)
            setInitialLoading(false)
            setLoadingRestaurants(false)
        }).catch(e => {
            setLoadingRestaurants(false)
        })
    }

    return (
        <div id="restaurantsTable">
            {
                initialLoading ? <ProgressSpinner></ProgressSpinner>
                    :
                    <>
                        <h1 id="restaurantsHeader">{i18n.t('restaurants') + " - " + i18n.t('total') + " (" + (total ?? 0) + ")"}</h1>
                        <RestaurantsTable
                            fetch={fetch}
                            loading={loadingRestaurants}
                            total={total}
                            restaurants={_.without(_.map(restaurants['items'], (item) => { if (!item.is_deleted) return item }), undefined)}>

                        </RestaurantsTable>
                    </>
            }
        </div>
    );
}
export default Index;
