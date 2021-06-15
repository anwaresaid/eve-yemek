import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useRouter } from 'next/router';
import { foodCategoryTypes } from '../../store/types/foodCategory.type';
import { useFormik } from 'formik';
import classNames from 'classnames';
import {
  getAddonCategoryDetails,
  updateAddonCategory,
} from '../../store/actions/addon-category.action';
import { i18n } from '../../language';

export const AddonCategoryEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);
  const addonCategoryDetail = useSelector(
    (state: RootState) => state.addonCategoryDetails
  );
  const {
    addonCategory,
    loading,
    success: detailsSuccess,
  } = addonCategoryDetail;

  const updatedAddonCategory = useSelector(
    (state: RootState) => state.updateAddonCategory
  );
  const { loading: loadingUpdate, success: successUpdate } =
    updatedAddonCategory;

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
        errors.name = 'addon name is required.';
      }
      if (!data.enum) {
        errors.enum = 'enum is required.';
      }
      return errors;
    },
    onSubmit: (data: any) => {
      dispatch(updateAddonCategory(addonCategory.id, data));
    },
  });
  useEffect(() => {
    if(router.query.id){
    if (!detailsSuccess || router.query.id !== addonCategory.id) {
      dispatch(getAddonCategoryDetails(router.query.id));
    }
    if (detailsSuccess && addonCategory) {
      formik.values.name = addonCategory.name;
      formik.values.enum = addonCategory.enum;
      if (successUpdate) {
        dispatch({
          type: foodCategoryTypes.FOOD_CATEGORY_UPDATE_RESET,
        });
        dispatch({
          type: foodCategoryTypes.FOOD_CATEGORY_DETAILS_RESET,
        });
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Addon Updated Successfully',
        });
        router.push('/addon_categories');
      }
    }
  }
  }, [dispatch, detailsSuccess, addonCategory,loading, successUpdate,router.query.id]);

    return (
    <div id="edit_Add_On_Category">
      <h1 id="editHeader">Kategori Detayi</h1>
      <Toast id="toastMessage" ref={toast}></Toast>
      {!loading && detailsSuccess ? (
        <S.ContainerCard id="container">
          <form id="editForm" onSubmit={formik.handleSubmit}>
            <div className='p-fluid'>
              <div id="nameDiv" className='p-field'>
                <h4 id="nameHeader">Kategori Adı</h4>
                <InputText
                  id='name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type='text'
                  className={classNames({
                    'p-invalid': isFormFieldValid('name'),
                  })}
                />
                <label
                  htmlFor='name'
                  id="errorName"
                  className={classNames({
                    'p-error': isFormFieldValid('name'),
                  })}
                ></label>
                {getFormErrorMessage('name')}
              </div>
              <div id="enumDiv"className='p-field'>
                <h4 id="enumHeader">Tur</h4>
                <InputText
                  id='enum'
                  name='enum'
                  value={formik.values.enum}
                  onChange={formik.handleChange}
                  type='text'
                  className={classNames({
                    'p-invalid': isFormFieldValid('enum'),
                  })}
                />
                <label
                  htmlFor='enum'
                  id="errorEnum"
                  className={classNames({
                    'p-error': isFormFieldValid('enum'),
                  })}
                ></label>
                {getFormErrorMessage('enum')}
              </div>
            </div>
            <S.SubmitBtn>
              <Button id="btnUpdate" type='submit' label={i18n.t('submit')} />
            </S.SubmitBtn>
          </form>
        </S.ContainerCard>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default AddonCategoryEdit;
