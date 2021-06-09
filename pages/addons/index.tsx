import React, { useState,useEffect } from "react"
import AddonsTable from "../../components/tables/addonsTable"
import { listAddons } from "../../store/actions/addons.action"
import { listAddonCategory } from "../../store/actions/addon-category.action"
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from "typesafe-actions"
import { ProgressSpinner } from 'primereact/progressspinner'

const restaurantOwnerList = () => {
    const [addon, setAddon] = useState(null)
    const [addonCategory, setAddonCategory] = useState(null)

    const dispatch = useDispatch();
    const res = useSelector((state:RootState) => state.listAddons);
    const {loading, success, addons} = res;
    const resCat = useSelector((state:RootState) => state.listAddonCategory);
    const {loading:loadingCate, success:successCat, addonCat} = resCat;

    useEffect( () => {
        if (!addons)
            dispatch(listAddons());
        if(!addonCat)
            dispatch(listAddonCategory());
     }, [dispatch]);

    useEffect(() => {
        if(success&&successCat){
            setAddon(addons.items);
            setAddonCategory(addonCat.items);
        }
    }, [success,successCat])
    return (
        <div id="addonsTabe">
            {!loading && <AddonsTable addons={addon} addonCat={addonCategory} ></AddonsTable>}
            {loading && <ProgressSpinner/>}
        </div>
    )
}

export default restaurantOwnerList;