import { useState } from "react";
import Header from "../../components/InTableComponents/Header";
import StandardTable from "../../components/StandardTable";
import { i18n } from "../../language";

const Transfers = () => {

    const [globalFilter, setGlobalFilter] = useState(null);

    let columns = [
        {field: 'id', header: 'ID'},
        {field: 'restaurant', header: i18n.t('restaurant')},
        {field: 'totalAmount', header: i18n.t('totalAmount')},
        {field: 'orderTime', header: i18n.t('created')},
        {field: 'ops', header: i18n.t('operations')}
    ]

    return (
        <div id="transfersTable">
            <h1 id="transfersHeader">{i18n.t('transfers')}</h1>
            <StandardTable
                header={Header(setGlobalFilter,"Transfers")}
                columns={columns}
                globalFilter={globalFilter} 
                emptyMessage="No transfers found"
                > 
            </StandardTable>
        </div>
    )
}

export default Transfers;