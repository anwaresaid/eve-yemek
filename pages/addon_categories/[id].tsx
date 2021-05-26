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

export const AddonCategoryEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const toast = useRef(null);

  const addonCategoryDetails = useSelector(
    (state: RootState) => state.addonCategoryDetails
  );
  const {
    addonCategory,
    loading,
    success: detailsSuccess,
  } = addonCategoryDetails;

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
    if (detailsSuccess) {
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
    } else {
      dispatch(getAddonCategoryDetails(router.query.id));
    }
  }, [dispatch, detailsSuccess, loading, addonCategory, successUpdate]);

  return (
    <div>
      <h1>Kategori Detayi</h1>
      <Toast ref={toast}></Toast>
      {!loading && detailsSuccess ? (
        <S.ContainerCard>
          <form onSubmit={formik.handleSubmit}>
            <div className='p-fluid'>
              <div className='p-field'>
                <h4>Kategori Adı</h4>
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
                  className={classNames({
                    'p-error': isFormFieldValid('name'),
                  })}
                ></label>
                {getFormErrorMessage('name')}
              </div>
              <div className='p-field'>
                <h4>Tur</h4>
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
                  className={classNames({
                    'p-error': isFormFieldValid('enum'),
                  })}
                ></label>
                {getFormErrorMessage('enum')}
              </div>
            </div>
            <S.SubmitBtn>
              <Button type='submit' label='Submit' />
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
