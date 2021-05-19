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

td{
    word-wrap:break-word
}

`;
