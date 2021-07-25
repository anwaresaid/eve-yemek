import React, { useState } from 'react';
import * as S from '../../styles/auth/login.style';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { i18n } from '../../language';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
	const dispatch = useDispatch()
	
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) {
      alert('Please fill your email');
      return;
    }

    
  };

  return (
    <>
      <S.Wrapper>
        <S.LoginWrapper>
          <Card className='p-shadow-5'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <S.Header className='p-text-center'>
                {i18n.t('forgotPassword')}
              </S.Header>
              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col-12 p-md-12'>
                  <InputText
                    required
                    placeholder={i18n.t('email')}
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail((e?.target as any)?.value)}
                  />
                </div>
              </div>
              <Button
                type='submit'
                label={i18n.t('submit')}
                className='p-button-rounded p-button-danger'
              />
            </form>
          </Card>
        </S.LoginWrapper>
      </S.Wrapper>
    </>
  );
};

export default ForgotPassword;
