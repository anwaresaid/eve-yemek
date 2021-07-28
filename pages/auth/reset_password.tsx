import React, { useRef, useState } from 'react';
import * as S from '../../styles/auth/login.style';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { i18n } from '../../language';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/actions/user.action';
import { RootState } from 'typesafe-actions';
import { Password } from 'primereact/password';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { userTypes } from '../../store/types/user.type';
import { Toast } from 'primereact/toast';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const token = router.query.token;
  const id = router.query.id;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const res = useSelector((state: RootState) => state.resetPassword);
  const { loading, data, success, error } = res;

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

    dispatch(resetPassword(password, token, id))
  };

  useEffect(() => {
    if(success){
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: i18n.t('success'),
      });
      setTimeout(() => { router.push('/auth/login') }, 2000)
      dispatch({ type: userTypes.RESET_PASSWORD_REQUEST_RESET });
      dispatch({ type: userTypes.RESET_PASSWORD_RESET });
    }
  },[success])

  return (
    <>
      <S.Wrapper>
      <Toast id='toastMessage' ref={toast}></Toast>
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
