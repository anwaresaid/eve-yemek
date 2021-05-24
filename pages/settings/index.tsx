import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listSettings } from '../../store/actions/settings.action';
import { TabView, TabPanel } from 'primereact/tabview';
import * as S from '../../styles/food/create-food/food.create.style';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import classNames from 'classnames';
import { InputNumber } from 'primereact/inputnumber';

const index = () => {
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const res = useSelector((state: RootState) => state.listSettings);
  const { loading, success, settings } = res;

  const formik = useFormik({
    initialValues: {
      app_name: '',
      time_zone: '',
      currency_code: '',
      currency_symbol: '',
      is_taxed: false,
      tax_rate: 0,
      is_delivery_charged: false,
      delivery_charge: 0,
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.app_name) {
        errors.app_name = 'App Name is required.';
      }
      if (!data.time_zone) {
        errors.time_zone = 'Time Zone is required.';
      }
      if (!data.currency_code) {
        errors.currency_code = 'Currency Code is required.';
      }
      if (!data.currency_symbol) {
        errors.currency_symbol = 'Currency Symbol is required.';
      }
      return errors;
    },
    onSubmit: (data: any) => {
      console.log(settings);
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
      formik.values.app_name = settings.app_name;
      formik.values.time_zone = settings.time_zone;
      formik.values.currency_code = settings.currency_code;
      formik.values.currency_symbol = settings.currency_symbol;
      formik.values.is_taxed = settings.is_taxed;
      formik.values.tax_rate = settings.tax_rate;
      formik.values.is_delivery_charged = settings.is_delivery_charged;
      formik.values.delivery_charge = settings.delivery_charge;
    } else {
      dispatch(listSettings());
    }
  }, [dispatch, settings, success, loading]);

  const GeneralSettings = () => {
    return (
      <>
        <div className='p-field'>
          <h4>Uygulama Adi</h4>
          <InputText
            id='app_name'
            value={formik.values.app_name}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('app_name'),
            })}
          />
          <label
            htmlFor='app_name'
            className={classNames({ 'p-error': isFormFieldValid('app_name') })}
          ></label>
          {getFormErrorMessage('app_name')}
        </div>
        <div className='p-field'>
          <h4>Zaman Dilimi</h4>
          <InputText
            id='time_zone'
            value={formik.values.time_zone}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('time_zone'),
            })}
          />
          <label
            htmlFor='time_zone'
            className={classNames({ 'p-error': isFormFieldValid('time_zone') })}
          ></label>
          {getFormErrorMessage('time_zone')}
        </div>
        <div className='p-field'>
          <h4>Para Birimi Kodu</h4>
          <InputText
            id='currency_code'
            value={formik.values.currency_code}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('currency_code'),
            })}
          />
          <label
            htmlFor='currency_code'
            className={classNames({
              'p-error': isFormFieldValid('currency_code'),
            })}
          ></label>
          {getFormErrorMessage('currency_code')}
        </div>
        <div className='p-field'>
          <h4>Para Birimi Sembolu</h4>
          <InputText
            id='currency_symbol'
            value={formik.values.currency_symbol}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('currency_symbol'),
            })}
          />
          <label
            htmlFor='currency_symbol'
            className={classNames({
              'p-error': isFormFieldValid('currency_symbol'),
            })}
          ></label>
          {getFormErrorMessage('currency_symbol')}
        </div>
        <div className='p-field'>
          <h4>Veri uygulanabilir</h4>
          <InputSwitch
            id='is_taxed '
            name='is_taxed'
            checked={formik.values.is_taxed}
            onChange={formik.handleChange}
          ></InputSwitch>
          <label
            htmlFor='is_taxed'
            className={classNames({ 'p-error': isFormFieldValid('is_taxed') })}
          ></label>
          {getFormErrorMessage('is_taxed')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Vergi Yuzdesi</h4>
          <InputNumber
            disabled={formik.values.is_taxed ? false : true}
            id='tax_rate '
            name='tax_rate'
            value={formik.values.tax_rate}
            onValueChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('tax_rate'),
            })}
          />
          <label
            htmlFor='tax_rate'
            className={classNames({ 'p-error': isFormFieldValid('tax_rate') })}
          ></label>
          {getFormErrorMessage('tax_rate')}
        </div>
        <div className='p-field'>
          <h4>Kargo Ucreti uygulanabilir</h4>
          <InputSwitch
            id='is_delivery_charged '
            name='is_delivery_charged'
            checked={formik.values.is_delivery_charged}
            onChange={formik.handleChange}
          ></InputSwitch>
          <label
            htmlFor='is_delivery_charged'
            className={classNames({ 'p-error': isFormFieldValid('is_delivery_charged') })}
          ></label>
          {getFormErrorMessage('is_delivery_charged')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Kargo Ucreti</h4>
          <InputNumber
            disabled={formik.values.is_delivery_charged ? false : true}
            id='delivery_charge '
            name='delivery_charge'
            value={formik.values.delivery_charge}
            onValueChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('delivery_charge'),
            })}
          />
          <label
            htmlFor='delivery_charge'
            className={classNames({ 'p-error': isFormFieldValid('delivery_charge') })}
          ></label>
          {getFormErrorMessage('delivery_charge')}
        </div>
      </>
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
