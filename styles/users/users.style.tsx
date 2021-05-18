import styled from "styled-components";
import vars from "../core/variables";
import { DataTable } from 'primereact/datatable';

export const Table = styled(DataTable)`
    .datatable-filter-demo .p-paginator .p-paginator-current {
    margin-right: auto !important;
}
.table-header {
    display: flex;
    justify-content: space-between;
}
.restaurant-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

`;
