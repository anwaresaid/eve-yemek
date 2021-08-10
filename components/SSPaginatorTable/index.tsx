import React, { useEffect, useState } from "react"
import { Column } from 'primereact/column';
import * as S from '../../styles/standard_table_style/standard.table.style'
import { i18n } from "../../language";

/* SERVER-SIDE PAGINATOR TABLE
*  This Table component enables lazy fetching of data, page-by-page.
*  Three props are absolutely necessary:
*  1. value: the data to be displayed
*  2. fetch: a function that fetches new data on demand. 2 params should be accepted in the manner fetch(offset, limit)
*  3. loading: a boolean, when true, the table will show a loading spinner.
*  Note: The parent component should pass the fetch function to this table as a prop. It will be invoked in this component.
*  When fetch is in process, the fetch function should set the loading prop to true, and then back to false when it completes.
*  Then the fetch function should assign the result set to the value prop variable.
*/
const SSPaginatorTable = (props) => {

    const [first, setFirst] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const onPage = (e) => {
        props.fetch(e.page * e.rows, e.rows)
        setFirst(e.first)
        setRowsPerPage(e.rows)
    }

    const dynamicColumns = props.columns.map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable />;
    });


    return (
        <S.Table id='styledTable' {...props} className="p-datatable-gridlines p-datatable-sm p-datatable-striped" autoLayout={true} paginator={!props.noPaginator}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate={i18n.t('showingXtoYofZ', { x: '{first}', y: '{last}', z: '{totalRecords}' })}
            value={props.value}
            first={first}
            rows={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50]}
            totalRecords={props.total}
            lazy
            onPage={onPage}
        >
            {dynamicColumns}
        </S.Table>
    )
}

export default SSPaginatorTable