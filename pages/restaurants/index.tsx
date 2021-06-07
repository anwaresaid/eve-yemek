import React, { useState, useEffect } from 'react';
import * as S from '../../styles/restaurants/restaurants.style'
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { listRestaurant } from "../../store/actions/restaurant.action";
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import {useRouter} from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';
import RestaurantsTable from '../../components/tables/restaurantsTable';
const Index = () => {



    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const dispatch = useDispatch();
    const resList = useSelector((state: RootState) =>  state.listRestaurant);
    const {loading, success, restaurants} = resList;
    const router = useRouter();
    const path = 'restaurants';
    useEffect(() => {
        // restaurantService.getRestaurants().then(data => setRestaurants(data.items));
      
        dispatch(listRestaurant());

        }, [dispatch]);

        console.log(restaurants);
    return (
        <div>
            {!loading && restaurants &&<RestaurantsTable restaurants={restaurants.items}></RestaurantsTable> }
            {loading&& <ProgressSpinner/>}

        </div>
    );
}
export default Index;
