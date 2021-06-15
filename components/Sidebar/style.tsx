import styled from "styled-components";
import vars from "../../styles/core/variables";

export const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:${vars.sidebar_left_margin}px;
    max-width:${vars.sidebar_left_margin}px;
    box-shadow:0px 0px 25px 0px rgba(0,0,0,.15);
    padding:0 0px;
    display:flex;
    flex-direction: column;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: all 0.25s ease-in-out;
    transform-origin: 1px;
    z-index: 3;

    .p-panelmenu{
        width:100%;
        height:100%;
        border:0!important;
        overflow-y:auto;
        background:white;
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
        background:${vars.colors.eve_yemek_color}!important;

        span{
            color:#fff!important;
        }
    }
`;

export const TopLogoContainer = styled.div`
    position:relative;
    padding:10px 35px;
    border-bottom:1px solid #ccc;
    background-color:white;
    img{
        max-width:100%;
        max-height:100%;
    }
`;
