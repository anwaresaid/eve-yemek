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
.food-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
`;


export const TextCotainerT = styled.div`
        color:white;
        width:60%;
        height:60%;
        text-align: center;
        background-color:green;
        
`;

export const imgContainer  = styled.img`
        width:50px;
        height:50px;
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