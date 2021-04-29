import React, { useState } from "react";

//import of styled components
import * as S from "./style";

//import of primereact components
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
var reg = /\S+@\S+\.\S+/;
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [people, setPeople] = useState([]);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSubmit = (evt) => {
    evt.preverntDefault();
    if (user.email === "" && user.password === "") {
      alert("Please fill the form");
    } else if (user.password.length > 8) {
      alert("Password should be longer!");
    }
  };
  return (
    <>
      <S.Wrapper>
        <S.LoginWrapper>
          <Card
            className='p-shadow-5'
            style={{ width: "420px", borderRadius: "10px", padding: "20px" }}
          >
            <S.Form onSubmit={handleSubmit}>
              <S.Header className='p-text-center'>Login</S.Header>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col-12 p-md-12'>
                  <InputText
                    required
                    placeholder='E-mail'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='p-field p-col-12 p-md-12'>
                  <Password
                    toggleMask
                    placeholder='Password'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button
                style={{
                  width: "200px",
                  marginTop: "25px",
                  marginLeft: "70px",
                }}
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
