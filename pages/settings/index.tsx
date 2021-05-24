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
      fcm_project_id: '',
      fcm_app_id: '',
      fcm_sender_id: '',
      fcm_web_certificate: '',
      fcm_web_api_key: '',
      fcm_web_server_key: '',
      is_active: false,
      otp_verification_on_registration: false,
      twilio_sid: '',
      twilio_access_token: '',
      twilio_service_id: '',
      google_api_key: '',
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
      if (!data.fcm_project_id) {
        errors.fcm_project_id = 'FCM Project ID is required.';
      }
      if (!data.fcm_app_id) {
        errors.fcm_app_id = 'FCM APP ID is required.';
      }
      if (!data.fcm_sender_id) {
        errors.fcm_sender_id = 'FCM Sender ID is required.';
      }
      if (!data.fcm_web_certificate) {
        errors.fcm_web_certificate = 'FCM Web Certificate is required.';
      }
      if (!data.fcm_web_api_key) {
        errors.fcm_web_api_key = 'FCM Web API Key is required.';
      }
      if (!data.fcm_web_server_key) {
        errors.fcm_web_server_key = 'FCM Web Server Key is required.';
      }
      if (!data.twilio_sid) {
        errors.twilio_sid = 'Twilio SID is required.';
      }
      if (!data.twilio_access_token) {
        errors.twilio_access_token = 'Twilio Access Token is required.';
      }
      if (!data.twilio_service_id) {
        errors.twilio_service_id = 'Twilio Service is required.';
      }
      if (!data.google_api_key) {
        errors.google_api_key = 'Google API Key is required.';
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

      formik.values.fcm_project_id = settings.fcm_project_id;
      formik.values.fcm_app_id = settings.fcm_app_id;
      formik.values.fcm_sender_id = settings.fcm_sender_id;
      formik.values.fcm_web_certificate = settings.fcm_web_certificate;
      formik.values.fcm_web_api_key = settings.fcm_web_api_key;
      formik.values.fcm_web_server_key = settings.fcm_web_server_key;
      formik.values.is_active = settings.is_active;

      formik.values.otp_verification_on_registration = settings.otp_verification_on_registration;
      formik.values.twilio_sid = settings.twilio_sid;
      formik.values.twilio_access_token = settings.twilio_access_token;
      formik.values.twilio_service_id = settings.twilio_service_id;

      formik.values.google_api_key = settings.google_api_key;
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
            className={classNames({
              'p-error': isFormFieldValid('is_delivery_charged'),
            })}
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
            className={classNames({
              'p-error': isFormFieldValid('delivery_charge'),
            })}
          ></label>
          {getFormErrorMessage('delivery_charge')}
        </div>
      </>
    );
  };

  const NotificationSettings = () => {
    return (
      <>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM Project ID</h4>
          <InputText
            id='fcm_project_id'
            value={formik.values.fcm_project_id}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_project_id'),
            })}
          />
          <label
            htmlFor='fcm_project_id'
            className={classNames({
              'p-error': isFormFieldValid('fcm_project_id'),
            })}
          ></label>
          {getFormErrorMessage('fcm_project_id')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM APP ID</h4>
          <InputText
            id='fcm_app_id'
            value={formik.values.fcm_app_id}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_app_id'),
            })}
          />
          <label
            htmlFor='fcm_app_id'
            className={classNames({
              'p-error': isFormFieldValid('fcm_app_id'),
            })}
          ></label>
          {getFormErrorMessage('fcm_app_id')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM Sender ID</h4>
          <InputText
            id='fcm_sender_id'
            value={formik.values.fcm_sender_id}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_sender_id'),
            })}
          />
          <label
            htmlFor='fcm_sender_id'
            className={classNames({
              'p-error': isFormFieldValid('fcm_sender_id'),
            })}
          ></label>
          {getFormErrorMessage('fcm_sender_id')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM Web Certificate</h4>
          <InputText
            id='fcm_web_certificate'
            value={formik.values.fcm_web_certificate}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_web_certificate'),
            })}
          />
          <label
            htmlFor='fcm_web_certificate'
            className={classNames({
              'p-error': isFormFieldValid('fcm_web_certificate'),
            })}
          ></label>
          {getFormErrorMessage('fcm_web_certificate')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM Web API Key</h4>
          <InputText
            id='fcm_web_api_key'
            value={formik.values.fcm_web_api_key}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_web_api_key'),
            })}
          />
          <label
            htmlFor='fcm_web_api_key'
            className={classNames({
              'p-error': isFormFieldValid('fcm_web_api_key'),
            })}
          ></label>
          {getFormErrorMessage('fcm_web_api_key')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>FCM Server Key</h4>
          <InputText
            id='fcm_web_server_key'
            value={formik.values.fcm_web_server_key}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('fcm_web_server_key'),
            })}
          />
          <label
            htmlFor='fcm_web_server_key'
            className={classNames({
              'p-error': isFormFieldValid('fcm_web_server_key'),
            })}
          ></label>
          {getFormErrorMessage('fcm_web_server_key')}
        </div>
        <div className='p-field'>
          <h4>Aktif</h4>
          <InputSwitch
            id='is_active '
            name='is_active'
            checked={formik.values.is_active}
            onChange={formik.handleChange}
          ></InputSwitch>
          <label
            htmlFor='is_active'
            className={classNames({
              'p-error': isFormFieldValid('is_active'),
            })}
          ></label>
          {getFormErrorMessage('is_active')}
        </div>
      </>
    );
  };

  const SMSGatewaySettings = () => {
    return (
      <>
        <div className='p-field'>
          <h4>OTP Verification on Registration</h4>
          <InputSwitch
            id='otp_verification_on_registration '
            name='otp_verification_on_registration'
            checked={formik.values.otp_verification_on_registration}
            onChange={formik.handleChange}
          ></InputSwitch>
          <label
            htmlFor='otp_verification_on_registration'
            className={classNames({
              'p-error': isFormFieldValid('otp_verification_on_registration'),
            })}
          ></label>
          {getFormErrorMessage('otp_verification_on_registration')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Twilio SID</h4>
          <InputText
            id='twilio_sid'
            value={formik.values.twilio_sid}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('twilio_sid'),
            })}
          />
          <label
            htmlFor='twilio_sid'
            className={classNames({
              'p-error': isFormFieldValid('twilio_sid'),
            })}
          ></label>
          {getFormErrorMessage('twilio_sid')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Twilio Access Token</h4>
          <InputText
            id='twilio_access_token'
            value={formik.values.twilio_access_token}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('twilio_access_token'),
            })}
          />
          <label
            htmlFor='twilio_access_token'
            className={classNames({
              'p-error': isFormFieldValid('twilio_access_token'),
            })}
          ></label>
          {getFormErrorMessage('twilio_access_token')}
        </div>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Twilio Service ID</h4>
          <InputText
            id='twilio_service_id'
            value={formik.values.twilio_service_id}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('twilio_service_id'),
            })}
          />
          <label
            htmlFor='twilio_service_id'
            className={classNames({
              'p-error': isFormFieldValid('twilio_service_id'),
            })}
          ></label>
          {getFormErrorMessage('twilio_service_id')}
        </div>
      </>
    );
  };

  const GoogleMapsSettings = () => {
    return (
      <>
        <div className='p-field p-col-12 p-md-4'>
          <h4>Google API Key</h4>
          <InputText
            id='google_api_key'
            value={formik.values.google_api_key}
            type='text'
            onChange={formik.handleChange}
            className={classNames({
              'p-invalid': isFormFieldValid('google_api_key'),
            })}
          />
          <label
            htmlFor='google_api_key'
            className={classNames({
              'p-error': isFormFieldValid('google_api_key'),
            })}
          ></label>
          {getFormErrorMessage('google_api_key')}
        </div>
      </>
    );
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
