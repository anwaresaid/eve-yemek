import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { createCoupons, updateCoupons, findCoupons } from '../../store/actions/coupons.action';
import { listRestaurant } from '../../store/actions/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { RootState } from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { i18n } from '../../language';
import { useRouter } from 'next/router';
import { couponsTypes } from '../../store/types/coupons.type';
import InputContainer from '../../components/inputs/inputContainer';
import InputGroup from '../../components/inputs/inputGroup';
import FormColumn from '../../components/inputs/formColumn';
import { InputTextarea } from 'primereact/inputtextarea';
import BackBtn from '../../components/backBtn';
import auth from '../../helpers/core/auth';
import moment from 'moment';

export const Index = () => {
  const toast = useRef(null);
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState(null);
  const dispatch = useDispatch();
  const [reloadCheck, setReloadCheck] = useState(false);
  //use selectors for setting dispatch to variable.

  const resRestaurants = useSelector(
    (state: RootState) => state.listRestaurant
    );
    const {
      loading: restaurantsLoading,
      success: restaurantsSuccess,
      restaurants,
    } = resRestaurants;
    const findCoupon = useSelector(
      (state: RootState) => state.findCoupons
    );
    const {
  
      success: couponSuccess,
      coupon,
    } = findCoupon;
    const couponUpdate = useSelector(
      (state: RootState) => state.updateCoupons
    );
    const {
      loading: updateLoading,
      success: updateSuccess,
    } = couponUpdate;


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
      restaurant: '',
      name: '',
      description: '',
      coupon_code: '',
      restaurant_id: '',
      date: '',
      discount: 0,
      discount_type: '',
      times_used:0,
      max_usage: 0,
      active: true,
    },
    validate: (data) => {
      let errors: any = {};
      if (!data.restaurant_id) {
        errors.restaurant_id = i18n.t('isRequired', { input: i18n.t('restaurant') });
      }
      if (!data.name) {
        errors.name = i18n.t('isRequired', { input: i18n.t('name') });
      }
      if (!data.description) {
        errors.description = i18n.t('isRequired', { input: i18n.t('description') });
      }
      if (!data.date) {
        errors.date = i18n.t('isRequired', { input: i18n.t('expiration') });
      }
      if (!data.coupon_code) {
        errors.coupon_code = i18n.t('isRequired', { input: i18n.t('couponCode') });
      }
      if (!data.max_usage) {
        errors.max_usage = i18n.t('isRequired', { input: i18n.t('maximumUsage') });
      }
      return errors;
    },
    onSubmit: (data: any) => {
      const updateCouponDto = {
        name: data.name,
        description: data.description,
        coupon_code: data.coupon_code,
        restaurant_id: data.restaurant_id === '6666' ? null : data.restaurant_id,
        expire_date: data.date,
        discount: data.discount,
        times_used: data.times_used,
        discount_type: "%", // Constant for now, will change when BE supports currency amount
        max_usage: data.max_usage,
        active: data.active,
      };
      dispatch(updateCoupons(router.query.id,updateCouponDto));
    },
  });
  //setting names for dropdowns.
  const settingDropDownNames = () => {
    const restaurantNames = restaurants.items.map((res) => {
      return { id: res.id, name: res.name };
    });
    restaurantNames.unshift({ id: '6666', name: i18n.t('allRestaurants') })
    setRestaurantName(restaurantNames);
  };

  useEffect(() => {
    if (!restaurantsSuccess) dispatch(listRestaurant(0, 9999));
    if(router.query.id)
      if(!couponSuccess|| router.query.id!=coupon.id) dispatch(findCoupons(router.query.id));

    if(restaurantsSuccess)
        settingDropDownNames();
    if (coupon ) 
    {
      formik.values.name = coupon.name;
      formik.values.restaurant_id = coupon?.restaurant?.id ? coupon.restaurant.id : formik.values.restaurant_id='6666';
      formik.values.description =  coupon.description;
      formik.values.date= coupon.expire_date;
      formik.values.discount = coupon.discount;
      formik.values.max_usage = coupon.max_usage;
      formik.values.times_used = coupon.times_used;
      formik.values.coupon_code = coupon.coupon_code;
      setReloadCheck(true);
    }
    if (updateSuccess) {
      toast.current.show({
        severity: 'success',
        summary: i18n.t('success'),
        detail: i18n.t('success'),
      });
     
      dispatch({ type: couponsTypes.COUPON_UPDATE_RESET });
      dispatch({ type: couponsTypes.COUPON_FIND_RESET });
    }
  }, [restaurantsSuccess, updateSuccess, couponSuccess, reloadCheck]);


  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid
  }
  
  return (
    auth.user.roles=='admin'|| auth.user.roles=='super_admin'?
    <div id='updateCoupon'>
      <BackBtn router={router} />
      <h1 id='createHeader'>{i18n.t('updateCoupon')}</h1>
      <Toast id='toastMessage' ref={toast}></Toast>
      <S.ContainerCard id='container'>
        <form id='createForm' onSubmit={formik.handleSubmit}>
          <div className='p-grid'>

            <FormColumn divideCount={3}>
              <InputGroup>
                <InputContainer label={i18n.t('couponName')} name="name" formiks={inputFormiks} component={InputText} iprops={{
                  value: formik.values.name,
                  onChange: formik.handleChange,
                }} />
              </InputGroup>
              <InputGroup>
                <InputContainer label={i18n.t('restaurant')} name="restaurant_id" formiks={inputFormiks} component={Dropdown} iprops={{
                  value: formik.values.restaurant_id,
                  onChange: formik.handleChange,
                  options: restaurantName,
                  filter: true,
                  filterBy: "name",
                  placeholder: i18n.t('selectRestaurant'),
                  optionLabel: "name",
                  optionValue: "id",
                }} />

              </InputGroup>

              <InputGroup>
                <InputContainer label={i18n.t('description')} name="description" formiks={inputFormiks} component={InputTextarea} iprops={{
                  value: formik.values.description,
                  onChange: formik.handleChange,
                  rows: 3,
                  autoResize: true
                }} />
              </InputGroup>
            </FormColumn>

            <FormColumn divideCount={3}>
              <InputGroup>
                <InputContainer label={i18n.t('expiration')} name='date' formiks={inputFormiks} component={Calendar} iprops={{
                  value: moment(formik.values.date).toDate(),
                  onChange: formik.handleChange,
                }} />

              </InputGroup>
              <InputGroup>
                <InputContainer label={i18n.t('discount')} name="discount" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                  value: formik.values.discount,
                  onValueChange: formik.handleChange,
                  min: 1,
                  showButtons: true,
                  suffix: '%'
                }} />
                 <InputContainer label={i18n.t('maximumUsage')} name="max_usage" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                   value: formik.values.max_usage,
                   onValueChange: formik.handleChange,
                   min: 1,
                   showButtons: true
                  }} />
                  <InputContainer label={i18n.t('timesUsed')} name="times_used" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                    value: formik.values.times_used,
                    onValueChange: formik.handleChange,
                    min: 1,
                    showButtons: true
                  }} />
              </InputGroup>
              <InputGroup>
                <InputContainer label={i18n.t('couponCode')} name="coupon_code" formiks={inputFormiks} size={6} component={InputText} iprops={{
                  onChange: formik.handleChange,
                  value: formik.values.coupon_code
                }} />
                <InputContainer label={i18n.t('active')} name="active" formiks={inputFormiks} size={6} component={InputSwitch} iprops={{
                  checked: formik.values.active,
                  onChange: formik.handleChange
                }} />
              </InputGroup>
            </FormColumn>
            <FormColumn>
              <S.SubmitBtn id='btnContainer'>
                <Button id='createBtn' type='submit' label={i18n.t('update')} />
              </S.SubmitBtn>
            </FormColumn>
          </div>
        </form>
      </S.ContainerCard>
    </div>:<></>
  );
};

export default Index;
