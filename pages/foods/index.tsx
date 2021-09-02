import React, { useState, useEffect } from "react";
import FoodsService from "../../store/services/foods.service";
import BackBtn from "../../components/backBtn";
import _ from 'lodash'
import { i18n } from "../../language";
import { useRouter } from "next/router";
import * as S from '../../styles/food/food.list.style'
import idColumn from "../../components/InTableComponents/idColumn";
import { priceBodyTemplate } from "../../components/InTableComponents/price";
import editButton from "../../components/InTableComponents/editButton";
import activeTag from "../../components/InTableComponents/activeTag";
import SSPaginatorTable from "../../components/SSPaginatorTable";
import auth from '../../helpers/core/auth';

const FoodsList = () => {
    const router = useRouter()

    const path = 'foods';
    const foodService = new FoodsService;

    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`} alt={rowData.image} />
    }

    const columns = [
        { field: 'id', header: "ID", body: idColumn},
        { field: 'image', header: i18n.t('image'), body: imageBodyTemplate },
        { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search', sortable: true },
        { field: 'food_category.name', header: i18n.t('category'), body: row => <a href={'/food_categories/' + row.food_category?.id} style={{ textDecoration: 'none' }}>{row.food_category?.name}</a>, filter: true, filterType: 'search', sortable: true },
        { field: 'price', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.price, rowData.currency_type), sortable: true },
        { field: 'ops', header: i18n.t('status'), body: (rowData) => activeTag(rowData.active) },
        auth.user.roles=='admin'|| auth.user.roles=='super_admin'||auth.user.roles=='restaurant_owner'?{ field: '', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, path) }:''
    ]

    return (
        <div id="foodsCategoryTable">
            <BackBtn router={router} />
            <h1>{i18n.t('meals')}</h1>
            <SSPaginatorTable
                headerText={i18n.t('listOfX', { x: i18n.t('foods') })}
                fetch={foodService.getAllFoods}
                columns={columns}
                emptyMessage={i18n.t('noXfound', { x: i18n.t('meals') })} />
        </div >
    );
}
export default FoodsList;
