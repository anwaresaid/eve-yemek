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
        padding:10px;
    }


    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin-bottom: .5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
    }

`;

export default GlobalStyle;