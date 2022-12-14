import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { listAllUsers } from '../../store/actions/userslists.action';
import { MultiSelect } from 'primereact/multiselect';
import { sendNotifications } from '../../store/actions/send_notifications.action';
import { i18n } from '../../language';
import BackBtn from '../../components/backBtn';


export const Index = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const router = useRouter();
  const [userNames, setUserNames] = useState(null);

  const allUsersList = useSelector((state: RootState) => state.allUsersList);
  const { success, loading, users } = allUsersList;

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className='p-error'>{formik.errors[name]}</small>
      )
    );
  };
  const formik = useFormik({
    initialValues: {
      users: '',
      title: '',
      body: '',
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.title) {
        errors.title = 'title is required.';
      }
      if (!data.body) {
        errors.body = 'body is required.';
      }
      return errors;
    },
    onSubmit: (data: any) => {
      console.log('submitted: ', {
        title: formik.values.title,
        body: formik.values.body,
        users: [...formik.values.users],
      });
      dispatch(
        sendNotifications(
          formik.values.title,
          formik.values.body,
          formik.values.users
        )
      );
      // sendFCM(formik.values.title, formik.values.body, formik.values.users)
      // send notification here instead of console log after FCM is integrated
    },
  });

  useEffect(() => {
    if (!success) {
      dispatch(listAllUsers());
    }
    if (success) {
      settingDropDownNames();
    }
  }, [success]);

  const settingDropDownNames = () => {
    const usersNames = users.items.map((user) => {
      return { name: user.name, id: user.id };
    });
    setUserNames(usersNames);
  };

  function multiSelect() {
    if (userNames != null)
      return (
        <div>
          <MultiSelect
            id='users'
            name='users'
            value={formik.values.users}
            options={userNames}
            optionValue='id'
            onChange={formik.handleChange}
            optionLabel='name'
            placeholder='Select users'
            display='users'
            className={classNames({ 'p-invalid': isFormFieldValid('users') })}
          />
        </div>
      );
  }

  return (
    <div>
      <BackBtn router={router}/>
      <h1>FCM Bildirim gonder</h1>
      <Toast ref={toast}></Toast>
      {success && !loading && users ? (
        <S.ContainerCard>
          <form onSubmit={formik.handleSubmit}>
            <div className='p-fluid'>
              <h4>Kullanicilari sec</h4>
              {multiSelect()}
              <div className='p-field'>
                <h4>Bildirim Ba??l??????</h4>
                <InputText
                  id='title'
                  name='title'
                  onChange={formik.handleChange}
                  type='text'
                  className={classNames({
                    'p-invalid': isFormFieldValid('title'),
                  })}
                />
                <label
                  htmlFor='title'
                  className={classNames({
                    'p-error': isFormFieldValid('title'),
                  })}
                ></label>
                {getFormErrorMessage('title')}
              </div>
              <div className='p-field'>
                <h4>Bildirim Mesaj??</h4>
                <InputText
                  id='body'
                  name='body'
                  onChange={formik.handleChange}
                  type='text'
                  className={classNames({
                    'p-invalid': isFormFieldValid('body'),
                  })}
                />
                <label
                  htmlFor='body'
                  className={classNames({
                    'p-error': isFormFieldValid('body'),
                  })}
                ></label>
                {getFormErrorMessage('body')}
              </div>
            </div>
            <S.SubmitBtn>
              <Button type='submit' label={i18n.t('submit')} />
            </S.SubmitBtn>
          </form>
        </S.ContainerCard>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default Index;
