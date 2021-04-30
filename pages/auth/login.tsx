import React from "react";

//import of styled components
import * as S from "./style";

//import of primereact components
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Login = () => {
  return (
    <>
      <S.Wrapper>
        <S.LoginWrapper>
          <Card className='p-shadow-5'>
            <S.Form>
              <S.Header className='p-text-center'>Login</S.Header>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col-12 p-md-12'>
                  <InputText required placeholder='E-mail' name='email' />
                </div>
                <div className='p-field p-col-12 p-md-12'>
                  <Password
                    toggleMask
                    placeholder='Password'
                    feedback={false}
                    name='password'
                  />
                </div>
              </div>
              <Button
                label='Login'
                className='p-button-rounded p-button-danger'
              />
            </S.Form>
          </Card>
        </S.LoginWrapper>
      </S.Wrapper>
    </>
  );
};

export default Login;
