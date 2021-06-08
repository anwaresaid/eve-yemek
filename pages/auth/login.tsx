import React, { useEffect, useState } from "react";

//import of styled components
import * as S from "../../styles/auth/login.style";

//import of primereact components
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { connect, useSelector } from "react-redux";

import userActions from "../../store/actions/user.action";
import { i18n } from "../../language";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const handleSubmit = async (e) => {
		
		e?.preventDefault();

		if(!email || !password){
			alert("Please fill E-Mail and Password fields");
			return;
		}

		//props.login("eveyemektesting+1620040878@gmail.com","123456");
		props.login(email, password, remember);
	}

	return (
		<>
			<S.Wrapper>
				<S.LoginWrapper>
					<Card className='p-shadow-5'>
						<form onSubmit={(e)=>handleSubmit(e)}>
							<S.Header className='p-text-center'>{i18n.t('login')}</S.Header>

							<div className='p-fluid p-formgrid p-grid'>
								<div className='p-field p-col-12 p-md-12'>
									<InputText 
										required 
										placeholder={i18n.t('email')}
										name='email'
										type="email"
										value={email}
										onChange={(e) => setEmail((e?.target as any)?.value)}
									/>
								</div>
								<div className='p-field p-col-12 p-md-12'>
									<Password
										required
										toggleMask
										placeholder={i18n.t('password')}
										feedback={false}
										name='password'
										value={password}
										onChange={(e) => setPassword((e?.target as any)?.value)}
									/>
								</div>
							</div>
							<div className='p-field-checkbox'>
								<Checkbox
									inputId='remember'
									checked={remember}
									onChange={(e) => setRemember(e.checked)}
								/>
								<label htmlFor='remember'>{i18n.t('rememberMe')}</label>
							</div>
							<div className="p-error">
								{props?.user?.login_error_msg}
							</div>
							<Button
								type="submit"
								label={i18n.t('login')}
								className='p-button-rounded p-button-danger'
							/>
						</form>
					</Card>
				</S.LoginWrapper>
			</S.Wrapper>
		</>
	);
};


function mapStateToProps(state) {
	return { user:state?.user };
}

export default connect(mapStateToProps, userActions)(Login)