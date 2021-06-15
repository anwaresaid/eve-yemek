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
import FormColumn from '../../components/inputs/formColumn';
import InputGroup from '../../components/inputs/inputGroup';
import InputContainer from '../../components/inputs/inputContainer';
import Loading from '../../components/Loading';

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
    if (router.query.id) {
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
  }, [
    dispatch,
    detailsSuccess,
    addonCategory,
    loading,
    successUpdate,
    router.query.id,
  ]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid,
  };

  return (
    <div id='edit_Add_On_Category'>
      <h1 id='editHeader'>Kategori Detayi</h1>
      <Toast id='toastMessage' ref={toast}></Toast>
      {!loading && detailsSuccess ? (
        <S.ContainerCard id='container'>
          <form onSubmit={formik.handleSubmit}>
            <S.ContainerCard id='container'>
              <div className='p-grid'>
                <FormColumn divideCount={3}>
                  <InputGroup>
                    <InputContainer
                      label={i18n.t('name')}
                      name='name'
                      formiks={inputFormiks}
                      component={InputText}
                      iprops={{
                        value: formik.values.name,
                        onChange: formik.handleChange,
                      }}
                    />
                  </InputGroup>
                </FormColumn>
                <FormColumn divideCount={3}>
                  <InputGroup>
                    <InputContainer
                      label={i18n.t('enum')}
                      name='enum'
                      formiks={inputFormiks}
                      component={InputText}
                      iprops={{
                        value: formik.values.enum,
                        onChange: formik.handleChange,
                      }}
                    />
                  </InputGroup>
                </FormColumn>
              </div>
              <S.SubmitBtn>
                <Button id='btnCreate' type='submit' label={i18n.t('submit')} />
              </S.SubmitBtn>
            </S.ContainerCard>
          </form>
        </S.ContainerCard>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AddonCategoryEdit;
