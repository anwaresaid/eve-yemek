import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { createAddonCategory } from '../../../store/actions/addon-category.action';
import { addonCategoryTypes } from '../../../store/types/addon-category.type';
import { i18n } from '../../../language';

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const addonCategoryCreate = useSelector(
    (state: RootState) => state.createAddonCategory
  );
  const { success } = addonCategoryCreate;

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
      name: '',
      enum: '',
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.name) {
        errors.name = i18n.t('isRequired', {input: i18n.t('userName')});;
      }
      if (!data.enum) {
        errors.enum = i18n.t('isRequired', {input: i18n.t('type')});;
      }
      return errors;
    },
    onSubmit: (data: any) => {
      dispatch(createAddonCategory(data));
    },
  });

  useEffect(() => {
    if (success) {
      router.push('/addon_categories');
      dispatch({ type: addonCategoryTypes.ADDON_CATEGORY_UPDATE_RESET });
    }
  }, [success]);

  return (
    <div id="create_Add_On_Category">
      <h1 id="createHeader">{i18n.t('createAddonCategory')}</h1>
      <Toast id="toastMessage" ref={toast}></Toast>
      <S.ContainerCard id='container'>
        <form id="createForm" onSubmit={formik.handleSubmit}>
          <div className='p-fluid'>
            <div id="nameDiv" className='p-field'>
              <h4 id="nameHeader">{i18n.t('categoryName')}</h4>
              <InputText
                id='name'
                name='name'
                onChange={formik.handleChange}
                type='text'
                className={classNames({
                  'p-invalid': isFormFieldValid('name'),
                })}
              />
              <label
                htmlFor='name'
                id="errorName"
                className={classNames({ 'p-error': isFormFieldValid('name') })}
              ></label>
              {getFormErrorMessage('name')}
            </div>
            <div id="enumDiv" className='p-field'>
              <h4 id="enumHeader">{i18n.t('type')}</h4>
              <InputText
                id='enum'
                name='enum'
                onChange={formik.handleChange}
                type='text'
                className={classNames({
                  'p-invalid': isFormFieldValid('enum'),
                })}
              />
              <label
                htmlFor='enum'
                id="errorEnum"
                className={classNames({ 'p-error': isFormFieldValid('enum') })}
              ></label>
              {getFormErrorMessage('enum')}
            </div>
          </div>
          <S.SubmitBtn>
            <Button id="btnCreate" type='submit' label={i18n.t('submit')} />
          </S.SubmitBtn>
        </form>
      </S.ContainerCard>
    </div>
  );
};

export default Index;
