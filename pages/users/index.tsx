import React, {useRef, useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import {RootState} from 'typesafe-actions';
import {useDispatch,useSelector} from 'react-redux';
import {Toast} from 'primereact/toast';
import AddUser from './add/index';
import { i18n } from '../../language';
import { TabPanel,TabView } from 'primereact/tabview';
import CustomerList from './customers';
import RestaurantOwnerList from './restaurant_owners';
import CustomerServiceList from './customer_service';
import DeliveryScoutsList from './delivery_scouts';


const Users = () =>{


    return(
        <TabView>
            <TabPanel header={i18n.t("customers")}>
                <CustomerList/>
            </TabPanel>
            <TabPanel header={i18n.t("restaurantOwners")}>
                <RestaurantOwnerList/>
            </TabPanel>
            <TabPanel header={i18n.t("customerServiceReps")}>
                <CustomerServiceList/>
            </TabPanel>
            <TabPanel header={i18n.t("deliveryScouts")}>
                <DeliveryScoutsList/>
            </TabPanel>
            <TabPanel header={i18n.t("createUser")}>
                <AddUser/>
            </TabPanel>
        </TabView>
    );

}

export default Users