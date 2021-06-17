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
import FormColumn from '../../../components/inputs/formColumn';
import InputGroup from '../../../components/inputs/inputGroup';
import InputContainer from '../../../components/inputs/inputContainer';

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
        errors.name = i18n.t('isRequired', { input: i18n.t('userName') });
      }
      if (!data.enum) {
        errors.enum = i18n.t('isRequired', { input: i18n.t('type') });
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

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid,
  };

  return (
    <div id='create_Add_On_Category'>
      <h1 id='createHeader'>{i18n.t('createAddonCategory')}</h1>
      <Toast id='toastMessage' ref={toast}></Toast>
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
    </div>
  );
};

export default Index;
