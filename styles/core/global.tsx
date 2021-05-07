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

    .main-context{
        min-height:100vh;
        background:#f4f4f4;
        margin-left:${vars.sidebar_left_margin}px;
        padding:25px;
    }


    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
    }

`;

export default GlobalStyle;