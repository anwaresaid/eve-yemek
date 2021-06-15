import styled from "styled-components";
import vars from "../core/variables";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  &:before {
    background-image: url(/images/logos/eve-yemek-05.png);
    background-repeat: no-repeat;
    background-size: 200px;
    display: inline-block;
    width: 200px;
    height: 100px;
    content: "";
    object-fit: contain;
    margin-top: 50px;
  }
  .p-button.p-button-danger,
  .p-buttonset.p-button-danger > .p-button,
  .p-splitbutton.p-button-danger > .p-button,
  .p-fileupload-choose.p-button-danger {
    background: ${vars.colors.eve_yemek_color}!important;
    border: none;
    padding: 12px;
    width: 200px;
    margin-top: 25px;
    margin-left: 50px;

    &:active,
    &:focus,
    &:hover {
      background: ${vars.colors.eve_yemek_color_darker} !important;
    }
  }

  .p-card {
    border-radius: 20px;
    padding: 0px 20px 10px 20px;
  }
  .p-card-body {
    width: 360px;
    padding: 25px;
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(/login/login-background.png);
  background-size: cover;

  .pi-eye,
  .pi-eye-slash {
    cursor: pointer;
  }
`;
export const Header = styled.h1`
  margin-bottom: 30px;
  margin-top: 0px;
  text-transform: uppercase;
`;