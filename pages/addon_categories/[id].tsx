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
import { Dropdown } from 'primereact/dropdown';
import { addonCategoryTypes } from '../../store/types/addon-category.type';
import auth from '../../helpers/core/auth';
import { listRestaurantOwners } from '../../store/actions/userslists.action';
import BackBtn from '../../components/backBtn';

export const AddonCategoryEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const [data, setData] = useState(false);

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
        errors.name = 'addon name is required.';
      }
      if (!data.enum) {
        errors.enum = 'enum is required.';
      }
      if (!data.create_user_id && (auth.hasRoles(['admin']) || auth.hasRoles(['super_admin']))) {
        errors.create_user_id = i18n.t('isRequired', { input: i18n.t('restaurantOwner') })
      } else if (!data.create_user_id && auth.hasRoles(['restaurant_owner'])) {
        data.create_user_id = auth.user.id
      } else {

      }
      return errors;
    },
    onSubmit: (data: any) => {
      dispatch(updateAddonCategory(addonCategory.id, data));
    },
  });
  useEffect(() => {
    if ((auth.hasRoles(['admin']) || auth.hasRoles(['super_admin']))) {
      if (!owners || (owners.items.length === 0 && (!ownersSuccess))) {
        dispatch(listRestaurantOwners())
      }
    }
    if (router.query.id) {
      if (
        detailsSuccess &&
        addonCategory &&
        router.query.id === addonCategory.id
      ) {
        setData(true);
        formik.values.name = addonCategory.name;
        formik.values.enum = addonCategory.enum;
        formik.values.create_user_id = addonCategory.create_user_id;
        if (successUpdate) {
          dispatch({
            type: addonCategoryTypes.ADDON_CATEGORY_UPDATE_RESET,
          });
          dispatch({
            type: addonCategoryTypes.ADDON_CATEGORY_DETAILS_RESET,
          });
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: i18n.t('success'),
          });
        }
      } else {
        setData(false);
        dispatch(getAddonCategoryDetails(router.query.id));
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

  const enumerationTypes = [
    { id: 'SINGLE', name: i18n.t('single') },
    { id: 'MULTIPLE', name: i18n.t('multiple') },
  ];

  return (
    (auth.user.roles=='admin'|| auth.user.roles=='super_admin')&&
    <div id='edit_Add_On_Category'>
      <BackBtn router={router}/>
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
                  (auth.hasRoles(['admin']) || auth.hasRoles(['super_admin'])) &&
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
                          options: owners?.items.map((one) => { return { label: one.name, value: one.id } }),
                          filter: true,
                          filterBy: "label",
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
        </S.ContainerCard>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AddonCategoryEdit;
