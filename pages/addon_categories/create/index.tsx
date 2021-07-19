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
import { Dropdown } from 'primereact/dropdown';
import auth from '../../../helpers/core/auth';
import { listRestaurantOwners } from '../../../store/actions/userslists.action';
import BackBtn from '../../../components/backBtn';

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const addonCategoryCreate = useSelector(
    (state: RootState) => state.createAddonCategory
  );
  const { loading: creating, success: createSuccess, error: createError } = addonCategoryCreate;

  const listOwnersState = useSelector((state: RootState) => state.listRestaurantOwners)
  const { loading: loadingOwners, success: ownersSuccess, restaurantOwners: owners } = listOwnersState

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
        errors.name = i18n.t('isRequired', { input: i18n.t('name') });
      }
      if (!data.enum) {
        errors.enum = i18n.t('isRequired', { input: i18n.t('type') });
      }
      if (!data.create_user_id && auth.hasRoles(['admin'])) {
        errors.create_user_id = i18n.t('isRequired', { input: i18n.t('restaurantOwner') })
      } else if (!data.create_user_id && auth.hasRoles(['restaurant_owner'])) {
        data.create_user_id = auth.user.id
      } else {

      }
      return errors;
    },
    onSubmit: (data: any) => {
      dispatch(createAddonCategory(data));
    },
  });

  useEffect(() => {
    if (createSuccess) {
      toast.current.show({
        severity: 'success',
        summary: i18n.t('success'),
        detail: i18n.t('success'),
      });
      setTimeout(() => { router.push('/addon_categories') }, 2000)
      dispatch({ type: addonCategoryTypes.ADDON_CATEGORY_CREATE_RESET });
    } else if (createError) {
      toast.current.show({
        severity: 'error',
        summary: i18n.t('error'),
        detail: createError,
      });
    }

    if (auth.hasRoles(['admin'])) {
      if (!owners || (owners.items.length === 0 && !ownersSuccess)) {
        dispatch(listRestaurantOwners())
      }
    }
  }, [createSuccess, createError, owners]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid,
  };

  const enumerationTypes = [
    { id: 'SINGLE', name: i18n.t('single') },
    { id: 'MULTIPLE', name: i18n.t('multiple') },
  ];

  return (
    <div id='create_Add_On_Category'>
      <BackBtn router={router}/>
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
              <h4 id='enum'>{i18n.t('enum')}</h4>
              <Dropdown
                id='enum'
                name='enum'
                value={formik.values.enum}
                options={enumerationTypes}
                optionValue='id'
                optionLabel='name'
                onChange={formik.handleChange}
                placeholder='Select Add-On Category Type'
                autoFocus
                className={classNames({
                  'p-invalid': isFormFieldValid('enum'),
                })}
              />
              <label
                id='enumError'
                htmlFor='enum'
                className={classNames({
                  'p-error': isFormFieldValid('enum'),
                })}
              ></label>
              {getFormErrorMessage('enum')}
            </FormColumn>
            {
              auth.hasRoles(['admin']) &&
              <FormColumn divideCount={3}>
                <InputGroup>
                  <InputContainer
                    label={i18n.t('restaurantOwner')}
                    name='create_user_id'
                    formiks={inputFormiks}
                    component={Dropdown}
                    iprops={{
                      value: formik.values.create_user_id,
                      onChange: formik.handleChange,
                      options: owners?.items.map((one) => { return { label: one.name, value: one.id } })
                    }}
                  />
                </InputGroup>
              </FormColumn>
            }
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
