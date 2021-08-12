import React, { useState } from "react";
import StandardTable from '../StandardTable';
import * as S from '../../styles/food/food.list.style'
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import editButton from "../InTableComponents/editButton";
import activeTag from "../InTableComponents/activeTag";
import { priceBodyTemplate } from "../InTableComponents/price";
import Header from '../InTableComponents/Header';
import { i18n } from "../../language";
import idColumn from "../InTableComponents/idColumn";

const FoodsTable = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const router = useRouter();
    const path = 'foods';

    const imageBodyTemplate = (rowData) => {
        return <S.Image src={`${rowData.image}`} alt={rowData.image} />
    }

    const columns = [
        { field: 'id', header: "ID", body: idColumn },
        { field: 'image', header: i18n.t('image'), body: imageBodyTemplate },
        { field: 'name', header: i18n.t('name') },
        { field: 'food_category.name', header: i18n.t('category'), body: row => <a href={'/food_categories/' + row.food_category?.id} style={{ textDecoration: 'none' }}>{row.food_category?.name}</a> },
        { field: 'price', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.price, rowData.currency_type) },
        { field: 'ops', header: i18n.t('status'), body: (rowData) => activeTag(rowData.active) },
        { field: '', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, path) }
    ]

    return (

        <StandardTable
            header={Header(setGlobalFilter, i18n.t('meals'))}
            columns={columns}
            value={props.foods}
            globalFilter={globalFilter}
            emptyMessage={i18n.t('noXfound', { x: i18n.t('meals') })} >
        </StandardTable>
    )

}

export default FoodsTable;
