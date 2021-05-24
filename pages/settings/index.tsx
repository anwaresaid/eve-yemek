import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listSettings } from '../../store/actions/settings.action';
import { TabView, TabPanel } from 'primereact/tabview';
import * as S from '../../styles/food/create-food/food.create.style';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';

const index = () => {
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const res = useSelector((state: RootState) => state.listSettings);
  const { loading, success, settings } = res;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.name) {
        errors.name = 'user name is required.';
      }
      return errors;
    },
    onSubmit: (data: any) => {
      console.log(data);
      console.log('formik submitted');
      // dispatch(addUser(data));
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className='p-error'>{formik.errors[name]}</small>
      )
    );
  };

  useEffect(() => {
    if (success && settings) {
      formik.values.name = settings.app_name;
    } else {
      dispatch(listSettings());
    }
  }, [dispatch, settings, success, loading]);

  const GeneralSettings = () => {
    return (
      <div className='p-field'>
        <h4>Ad</h4>
        <InputText
          id='name'
          value={formik.values.name}
          type='text'
          onChange={formik.handleChange}
          autoFocus
          className={classNames({ 'p-invalid': isFormFieldValid('name') })}
        />
        <label
          htmlFor='name'
          className={classNames({ 'p-error': isFormFieldValid('name') })}
        ></label>
        {getFormErrorMessage('name')}
      </div>
    );
  };

  const NotificationSettings = () => {
    return <h2>Notification Settings Here</h2>;
  };

  const SMSGatewaySettings = () => {
    return <h2>SMS Gateway Settings Here</h2>;
  };

  const GoogleMapsSettings = () => {
    return <h2>Google Maps Settings Here</h2>;
  };

  const PaymentSettings = () => {
    return <h2>Payment Settings Here</h2>;
  };

  return (
    <div>
      <h2>Eve Yemek Ayarlari</h2>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header='Genel'>
              <GeneralSettings />
            </TabPanel>
            <TabPanel header='Bildirim Gonder'>
              <NotificationSettings />
            </TabPanel>
            <TabPanel header='SMS Gateway'>
              <SMSGatewaySettings />
            </TabPanel>
            <TabPanel header='Google Maps'>
              <GoogleMapsSettings />
            </TabPanel>
            <TabPanel header='Odeme Gateway'>
              <PaymentSettings />
            </TabPanel>
          </TabView>

          <S.SubmitBtn>
            <Button type='submit' label='Submit' />
          </S.SubmitBtn>
        </form>
      )}
    </div>
  );
};

export default index;
