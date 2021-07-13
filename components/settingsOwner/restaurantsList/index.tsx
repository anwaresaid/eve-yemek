import { useRouter } from "next/dist/client/router";
import { Button } from "primereact/button";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import auth from "../../../helpers/core/auth";
import { i18n } from "../../../language";
import { listOwnedRestaurants } from "../../../store/actions/restaurant.action";
import idColumn from "../../InTableComponents/idColumn";
import StandardTable from "../../StandardTable";

const ResturantsList = () => {

    const ownedRestaurantsState = useSelector((state: RootState) => state.ownedRestaurants)
    const { loading: ownedRestaurantsLoading, success: ownedRestaurantsSuccess, ownedRestaurants } = ownedRestaurantsState

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(()=>{
        if (auth.hasRoles(['restaurant_owner'])) {
            if (ownedRestaurants?.items.length === 0 && !ownedRestaurantsSuccess){
                dispatch(listOwnedRestaurants())
            }
        }
    }, [ownedRestaurantsSuccess]);

    const tmpEditButton = (rowData, url) => {
        return <Button id='editBtn' icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={()=>{router.push("/settings/restaurant/"+rowData.id)}}/>
    }

    const ownedRestaurantsTableColumns = [
        { field: '#', header: '#', body: idColumn, style: { 'width': '20px' } },
        { field: 'name', header: i18n.t('restaurant') },
        { header: i18n.t('edit'), body: tmpEditButton },
    ]

    return (
        <StandardTable id='ownedRestaurants'
            columns={ownedRestaurantsTableColumns}
            value={ownedRestaurants?.items} 
            noPaginator
            style={{ tableLayout: "auto" }}
            resizableColumns
            columnResizeMode="expand" showGridlines
        />
    );

}

export default ResturantsList;