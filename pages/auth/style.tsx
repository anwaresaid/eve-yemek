import styled from "styled-components";

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
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(/login/login-background.png);
  background-size: cover;
`;
export const Header = styled.h1`
  margin-bottom: 30px;
  margin-top: 0px;
  text-transform: uppercase;
`;
export const Form = styled.form``;
