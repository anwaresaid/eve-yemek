import styled from "styled-components";

export const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:250px;
    max-width:250px;
    box-shadow:0px 0px 25px 0px rgba(0,0,0,.15);
    padding:0 8px;

    .p-menu{
        width:100%;
        height:100%;
        border:0!important;
    }

    .p-menuitem-link{
        border-radius:3px;
        margin-bottom:4px;

        &:active, &:focus{
            outline: 0 none;
            outline-offset: 0;
            box-shadow: 0 0;
        }
    }

    .p-menuitem-active{
        background:#d8d8d8!important;
    }
`;

export const TopLogoContainer = styled.div`
    position:relative;
    padding:10px 35px;
    border-bottom:1px solid #ccc;

    img{
        max-width:100%;
        max-height:100%;
    }
`;