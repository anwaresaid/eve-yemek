import { useState } from "react";
import Header from "../../components/InTableComponents/Header";
import StandardTable from "../../components/StandardTable";

const Transfers = () => {

    const [globalFilter, setGlobalFilter] = useState(null);

    let columns = [
        {field: 'id', header: 'Order ID'},
        {field: 'restaurant', header: 'Restaurant'},
        {field: 'totalAmount', header: 'Total Amount'},
        {field: 'orderTime', header: 'Created'},
        {field: 'ops', header: 'Operations'}
    ]

    return (
        <div id="transfersTable">
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