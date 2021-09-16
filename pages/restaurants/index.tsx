import React from "react";
import * as S from '../../styles/food/food.list.style'
import { useRouter } from 'next/router';
import { detailedDate } from "../../helpers/dateFunctions";
import activeTag from "../../components/InTableComponents/activeTag";
import editButton from "../../components/InTableComponents/editButton";
import { i18n } from "../../language";
import SSPaginatorTable from "../../components/SSPaginatorTable";
import RestaurantsService from "../../store/services/restaurants.service";
import auth from '../../helpers/core/auth';

const RestaurantsList = (props) => {
    const router = useRouter();
    const path = 'restaurants';
    let restaurantsService = new RestaurantsService()

    const imageBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <S.Image className="imageCol" src={`${rowData.image}`} alt={rowData.image} />
            </React.Fragment>
        )
    }
    const IdBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.id}
            </React.Fragment>
        );
    }
    const NameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.name}
            </React.Fragment>
        );
    }
    const OwnerBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.owner && rowData.owner.name}
            </React.Fragment>
        );
    }
    const CountryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span> {rowData?.address?.country}</span>
            </React.Fragment>
        );
    }
    const StatusBodyTemplate = (rowData) => {
        return (
            <div>
                <React.Fragment>
                    <span> {activeTag(rowData.active)}</span>
                </React.Fragment>
            </div>
        );
    }

    const editBodyTemplate = (rowData) => {
        return (
            <div>
                <React.Fragment>
                    <span> {editButton(rowData, router, path)}</span>
                </React.Fragment>
            </div>
        );
    }

    const dateBodyTemplate = (rowData) => {
        return (
            <div>
                <React.Fragment>
                    <span> {detailedDate(rowData.createdAt)}</span>
                </React.Fragment>
            </div>
        );
    }


    const columns = [
        { field: 'id', header: "ID", body: IdBodyTemplate, sortable: true },
        { field: 'image', header: i18n.t('image'), body: imageBodyTemplate },
        { field: 'name', header: i18n.t('name'), body: NameBodyTemplate, filter: true, filterType: 'search', sortable: true },
        { field: 'owner.name', header: i18n.t('restaurantOwner'), body: OwnerBodyTemplate, filter: true, filterType: 'search', sortable: true },
        { field: 'address.country', header: i18n.t('country'), body: CountryBodyTemplate, filter: true, filterType: 'search', sortable: true },
        { field: 'createdAt', header: i18n.t('created'), body: dateBodyTemplate, sortable: true },
        { field: 'ops', header: i18n.t('status'), body: StatusBodyTemplate },

         { field: '', header: i18n.t('operations'), body: editBodyTemplate }

    ]

    return (
        <SSPaginatorTable
            headerText={i18n.t('listOfX', { x: i18n.t('restaurants') })}
            fetch={restaurantsService.getRestaurants}
            columns={columns}
            emptyMessage={i18n.t('noXfound', { x: i18n.t('restaurants') })}
        />
    )

}

export default RestaurantsList;
