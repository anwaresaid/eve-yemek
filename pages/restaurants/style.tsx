import styled from "styled-components";
import vars from "../../styles/variables";
import { DataTable } from 'primereact/datatable';
export const Table = styled(DataTable)`
    .datatable-filter-demo .p-paginator .p-paginator-current {
    margin-right: auto !important;
}
.table-header {
    display: flex;
    justify-content: space-between;
}

`;


export const TextCotainerT = styled.div`
        color:white;
        width:30%;
        height:30%;
        text-align: center;
        background-color:green;
        
`;


export const TextCotainerF = styled.div`
        color:white;
        width:30%;
        height:30%;
        text-align: center;
        background-color:red;
        
`;

export const Span2 = styled.span`
        background-color:red;
`;