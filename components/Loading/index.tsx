import styled from "styled-components";
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = styled(ProgressSpinner)`
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
`;

export default Loading;