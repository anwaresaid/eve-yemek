import React, { useEffect, useState } from "react"
import * as S from '../../styles/standard_table_style/standard.table.style'
import { Column } from 'primereact/column';
import { i18n } from "../../language";

const StandardTable = (props) => {//"Showing {first} to {last} of {totalRecords}"

    const dynamicColumns = props.columns.map((col,i) => {
        return <Column  key={i} field={col.field} header={col.header} body={col.body} sortable />;
    });

    return (
        <S.Table id='styledTable' {...props} className="p-datatable-gridlines p-datatable-sm p-datatable-striped" autoLayout={true} paginator={!props.noPaginator}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate={i18n.t('showingXtoYofZ',{x: '{first}', y: '{last}', z: '{totalRecords}'})} rows={10} rowsPerPageOptions={[10,20,50]}>
            {dynamicColumns}
        </S.Table>
    )
}

export default StandardTable