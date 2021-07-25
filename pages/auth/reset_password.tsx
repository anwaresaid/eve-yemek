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
import { Password } from 'primereact/password';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const res = useSelector((state: RootState) => state.resetPasswordRequest);
  // const { loading, message, success, error } = res;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!password) {
      alert('Please fill your password');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('new password: ', password);
    console.log('confirm password: ', confirmPassword);
    // dispatch(resetPasswordRequest(email))
  };

  return (
    <>
      <S.Wrapper>
        <S.LoginWrapper>
          <Card className='p-shadow-5'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <S.Header className='p-text-center'>
                {i18n.t('resetPassword')}
              </S.Header>
              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col-12 p-md-12'>
                  <Password
                    required
                    toggleMask
                    placeholder={i18n.t('newPassword')}
                    feedback={false}
                    name='password'
                    value={password}
                    onChange={(e) => setPassword((e?.target as any)?.value)}
                  />
                </div>
                <div className='p-field p-col-12 p-md-12'>
                  <Password
                    required
                    toggleMask
                    placeholder={i18n.t('newPasswordAgain')}
                    feedback={false}
                    name='password'
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword((e?.target as any)?.value)
                    }
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

export default ResetPassword;
