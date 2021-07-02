import { createGlobalStyle } from "styled-components";
import vars from "./variables";

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height:1.5em;
    }

    *{
        box-sizing: border-box;
    }



    .app{
        
    }
    .p-button-secondary{
        margin-left:10px;
    }
    .main-context-card-showBar{
        position:fixed ;
        border-radius: 0px;
        top:0;
        width: calc(100% - ${vars.sidebar_left_margin}px);
        left:0;
        height: 65px;
        align-items: center;
        display: flex;
        margin-left:${vars.sidebar_left_margin}px;
        transition-property: margin-left;
        transition:  all 0.25s ease-in-out;
        z-index:2;

        .p-card-body{
            flex:1;
        }
    }
        
    .ContainerPanel{
        margin-top:-30px;
    }
    .main-context-card-hideBar{
        position:fixed ;
        border-radius: 0px;
        top:0;
        width: 100%;
        left:0;
        height: 65px;
        align-items: center;
        display: flex;
        z-index: 1037;
        margin-left:0;
        transition:  all 0.25s ease-in-out;

        .p-card-body{
            flex:1;
        }
    }

    .main-context-showBar{
        min-height:100vh;
        margin-top:65px;
        background:#f4f4f4;
        margin-left:${vars.sidebar_left_margin}px;
        padding:25px;
        transition:  all 0.25s ease-in-out;
        transition-property: margin-left;
        z-index: 1;

    }
    @media screen and (max-width:760px){
        .main-context-showBar{
            /* display:none; */
            margin-left:0px;
            transition:  all 0.5s ease-in-out;
        }
    }
    .main-context-hideBar{
        min-height:100vh;
        margin-top:65px;
        background:#f4f4f4;
        padding:25px;
        transition-property: width;
        transition-delay: 2s;
        transition:  all 0.25s ease-in-out;
        z-index: 1;

    }

    @media screen and (max-width:760px){
        .main-context-hideBar{
            /* display:none; */
            transition:  all 0.25s ease-in-out;
        }
    }
    @media screen and (max-width:500px){
        .main-context-hideBar{
             /* display:none; */
            transition:  all 0.25s ease-in-out;
        }
        .main-context-showBar{
             /* display:none; */
            transition:  all 0.25s ease-in-out;
        }
    }

   //data table
   .p-datatable-gridlines .p-datatable-tbody > tr > td .p-column-title {
    display: none;
}
@media screen and (max-width: 824px) {
     .p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th,
    .p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td {
        display: none !important;
    }
    .p-datatable-gridlines .p-datatable-tbody > tr > td .imageCol{
        width:60px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 100% !important;
        float: left;
        clear: left;
        border: 0 none;
    }

     .p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td .p-column-title {
        padding: .4rem;
        min-width: 30%;
        display: inline-block;
        margin: -.4em 1em -.4em -.4rem;
        font-weight: bold;
    }

   .p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-bottom: 1px solid var(--surface-d);
    }
}
////
    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
    }

    
    @media screen and (min-width: 1600px){
        .p-xxl-4 {
            width: 33.33%!important;
        }
    }

`;

export default GlobalStyle;