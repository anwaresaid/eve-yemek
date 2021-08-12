import React, { useState } from 'react';
import * as S from '../../styles/auth/login.style';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { i18n } from '../../language';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest } from '../../store/actions/user.action';
import { RootState } from 'typesafe-actions';
import Loading from '../../components/Loading';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const res = useSelector((state: RootState) => state.resetPasswordRequest);
  const { loading, message, success, error } = res;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) {
      alert('Please fill your email');
      return;
    }

    dispatch(resetPasswordRequest(email));
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
              {message === true && (
                <p>{i18n.t('anEmailHasBeenSentToYourAddress')}</p>
              )}
              {message === false && (
                <p>{i18n.t('errorTryingToReachYourEmail')}</p>
              )}
              {error && <p>{error}</p>}
              {!loading ? (
                <Button
                  type='submit'
                  label={i18n.t('submit')}
                  className='p-button-rounded p-button-danger'
                />
              ) : (
                <Loading />
              )}
            </form>
          </Card>
        </S.LoginWrapper>
      </S.Wrapper>
    </>
  );
};

export default ForgotPassword;
