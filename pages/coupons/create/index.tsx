import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { createCoupons } from '../../../store/actions/coupons.action';
import { listRestaurant } from '../../../store/actions/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { RootState } from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { i18n } from '../../../language';
import { useRouter } from 'next/router';
import { couponsTypes } from '../../../store/types/coupons.type';
import InputContainer from '../../../components/inputs/inputContainer';

export const Index = () => {
  const toast = useRef(null);
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState(null);
  const dispatch = useDispatch();

  //use selectors for setting dispatch to variable.

  const resRestaurants = useSelector(
    (state: RootState) => state.listRestaurant
  );
  const {
    loading: restaurantsLoading,
    success: restaurantsSuccess,
    restaurants,
  } = resRestaurants;

  const createdCoupon = useSelector((state: RootState) => state.createCoupons);
  const { success } = createdCoupon;

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className='p-error'>{formik.errors[name]}</small>
      )
    );
  };
  const discount_types = [
    { title: i18n.t('fixed'), value: 'FIXED' },
    { title: i18n.t('percentage'), value: 'PERCENTAGE' },
  ];

  const formik = useFormik({
    initialValues: {
      resName: '',
      name: '',
      description: '',
      coupon_code: '',
      restaurant_id: '',
      expire_date: '',
      discount: 0,
      discount_type: '',
      max_usage: 0,
      active: false,
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.resName) {
        errors.resName = 'restaurant is required.';
      } else {
        let selectedRestaurants = restaurants.items.filter((data) => {
          return data.name.localeCompare(formik.values.resName.name) == 0;
        });
        if (selectedRestaurants != null)
          formik.values.restaurant_id = selectedRestaurants[0]?._id;
      }

      if (!data.name) {
        errors.name = 'name is required.';
      }
      if (!data.description) {
        errors.description = 'description is required.';
      }
      if (!data.expire_date) {
        errors.expire_date = 'expire date is required.';
      }

      if (!data.discount_type) {
        errors.discount_type = 'discount_type is required.';
      }
      if (!data.max_usage) {
        errors.max_usage = 'max usage is required.';
      }

      return errors;
    },
    onSubmit: (data: any) => {
      const createCouponDto = {
        name: data.name,
        description: data.description,
        coupon_code: data.coupon_code,
        restaurant_id: data.resName,
        expire_date: data.expire_date,
        discount: data.discount,
        discount_type: data.discount_type,
        max_usage: data.max_usage,
        active: data.active,
      };
      dispatch(createCoupons(createCouponDto));
    },
  });
  //setting names for dropdowns.
  const settingDropDownNames = () => {
    const restaurantNames = restaurants.items.map((res) => {
      return { id: res.id, name: res.name };
    });
    restaurantNames.unshift({id: '6666', name: 'All Restaurants'})
    setRestaurantName(restaurantNames);
  };

  useEffect(() => {
    if (!restaurantsSuccess) dispatch(listRestaurant());

    if (restaurantsSuccess) settingDropDownNames();

    if (success) {
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: i18n.t('success'),
      });
      setTimeout(() => { router.push('/coupons') }, 2000)
      dispatch({ type: couponsTypes.COUPON_CREATE_RESET });
    }
  }, [restaurantsSuccess, success]);

  
    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }
  return (
    <div id='create_coupons'>
      <h1 id='createHeader'>{i18n.t('createCoupon')}</h1>
      <Toast id='toastMessage' ref={toast}></Toast>
      <S.ContainerCard id='container'>
        <form id='createForm' onSubmit={formik.handleSubmit}>
          <div className='p-fluid'>
            <div id='nameDiv' className='p-field'>
              <h4 id='nameHeader'>{i18n.t('couponName')}</h4>
              <InputText
                id='name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                type='text'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('name'),
                })}
              />
              <label
                id='errorName'
                htmlFor='name'
                className={classNames({ 'p-error': isFormFieldValid('name') })}
              ></label>
              {getFormErrorMessage('name')}
            </div>
            <div id='descriptionDiv' className='p-field'>
              <h4 id='descriptionHeader'>{i18n.t('couponDescription')}</h4>
              <InputText
                id='description'
                name='description'
                onChange={formik.handleChange}
                type='text'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('description'),
                })}
              />
              <label
                id='description'
                htmlFor='description'
                className={classNames({
                  'p-error': isFormFieldValid('description'),
                })}
              ></label>
              {getFormErrorMessage('description')}
            </div>
            <div id='restaurantDiv' className='p-field'>
              <h4 id='restaurantHeader'>{i18n.t('restaurant')}</h4>
              <Dropdown
                id='resName'
                name='resName'
                value={formik.values.resName}
                options={restaurantName}
                onChange={formik.handleChange}
                optionLabel='name'
                optionValue='id'
                placeholder='Select a Restaurant'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('resName'),
                })}
              />
              <label
                id='errorDescription'
                htmlFor='resName'
                className={classNames({
                  'p-error': isFormFieldValid('resName'),
                })}
              ></label>
              {getFormErrorMessage('resName')}
            </div>
            <div id='codeDiv' className='p-field'>
              <h4 id='codeHeader'>{i18n.t('couponCode')}</h4>
              <InputText
                id='coupon_code'
                name='coupon_code'
                onChange={formik.handleChange}
                type='text'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('coupon_code'),
                })}
              />
              <label
                id='errorCode'
                htmlFor='coupon_code'
                className={classNames({
                  'p-error': isFormFieldValid('coupon_code'),
                })}
              ></label>
              {getFormErrorMessage('coupon_code')}
            </div>
          </div>
          <div className='p-fluid'>
            <div id='discountTypeDiv' className='card'>
              <h4 id='discountTypeHeader'>{i18n.t('couponType')}</h4>
              <Dropdown
                id='discount_type'
                name='discount_type'
                value={formik.values.discount_type}
                options={discount_types}
                onChange={formik.handleChange}
                optionLabel='title'
                placeholder='İndirim Türü'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('discount_type'),
                })}
              />
              <label
                id='errorDiscountType'
                htmlFor='discount_type'
                className={classNames({
                  'p-error': isFormFieldValid('discount_type'),
                })}
              ></label>
              {getFormErrorMessage('discount_type')}
            </div>
          </div>
          <div className='p-grid p-fluid'>
            <div id='expirationDiv' className='p-field p-col-12 p-md-3'>
              <h4 id='expirationHeader'>{i18n.t('expiration')}</h4>
              <Calendar
                id='expire_date'
                name='expire_date'
                value={formik.values.date}
                onChange={formik.handleChange}
              />
            </div>
            {formik.values.discount_type=='FIXED'?
                              <InputContainer label={i18n.t('discount')} name="discount" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                value: formik.values.discount,
                                onValueChange: formik.handleChange,
                                showButtons: true,
                                suffix: '₺'
                                }} />
                              : 
                              <InputContainer label={i18n.t('discount')} name="discount" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                value: formik.values.discount,
                                onValueChange: formik.handleChange,
                                showButtons: true,
                                suffix: '%'
                            }} />
                              }
                              
            {/* <div id='discountDiv' className='p-field p-col-12 p-md-3'>
              <h4 id='discountHeader'>{i18n.t('discount')}</h4>
              <InputNumber
                id='discount'
                name='discount'
                value={formik.values.discount}
                onValueChange={formik.handleChange}
                showButtons
              />
            </div> */}
            <div id='max_usage_Div' className='p-field p-col-12 p-md-3'>
              <h4 id='max_usage_Header'>{i18n.t('maximumUsage')}</h4>
              <InputNumber
                id='max_usage'
                name='max_usage'
                value={formik.values.max_usage}
                onValueChange={formik.handleChange}
                showButtons
              />
            </div>
          </div>
          <div id='activeDiv'>
            <h4 id='activeHeader'>{i18n.t('active')}</h4>
            <InputSwitch
              checked={formik.values.active}
              name='active'
              id='active'
              onChange={formik.handleChange}
            />
          </div>
          <S.SubmitBtn id='btnContainer'>
            <Button id='createBtn' type='submit' label={i18n.t('create')} />
          </S.SubmitBtn>
        </form>
      </S.ContainerCard>
    </div>
  );
};

export default Index;
