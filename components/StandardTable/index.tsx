import React, { useEffect, useState } from "react"
import * as S from '../../styles/standard_table_style/standard.table.style'
import { Column } from 'primereact/column';

const StandardTable = (props) => {

    const dynamicColumns = props.columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable />;
    });

    return (
        <S.Table {...props} className="p-datatable-gridlines p-datatable-sm p-datatable-striped" paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}>
            {dynamicColumns}
        </S.Table>
    )
}

export default StandardTable