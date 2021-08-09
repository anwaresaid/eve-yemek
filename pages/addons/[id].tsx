import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import {
  findAddons,
  listAddons,
  updateAddons,
} from '../../store/actions/addons.action';
import { listAddonCategory } from '../../store/actions/addon-category.action';
import { createAddons } from '../../store/actions/addons.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { i18n } from '../../language';
import FormColumn from '../../components/inputs/formColumn';
import InputGroup from '../../components/inputs/inputGroup';
import InputContainer from '../../components/inputs/inputContainer';
import { useRouter } from 'next/dist/client/router';
import { addonsTypes } from '../../store/types/addons.type';
import { Toast } from 'primereact/toast';
import auth from '../../helpers/core/auth';
import { listRestaurantOwners } from '../../store/actions/userslists.action';
import BackBtn from '../../components/backBtn';
import { getSupportedCountries } from '../../store/actions/addresses.action';

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const [data, setData] = useState(false);

  const listAddonCategories = useSelector(
    (state: RootState) => state.listAddonCategory
  );
  const { success: addonCatSuccess, addonCat: addonCategoryList } =
    listAddonCategories;

  const findAddon = useSelector((state: RootState) => state.findAddons);
  const { success: successFind, addon } = findAddon;

  const listOwnersState = useSelector((state: RootState) => state.listRestaurantOwners)
  const { loading: loadingOwners, success: ownersSuccess, restaurantOwners: owners } = listOwnersState

  const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
  const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

  const updateAddon = useSelector((state: RootState) => state.updateAddons);
  const { success: successUpdate } = updateAddon;

  const [currency, setCurrency] = useState('TRY')

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
      addOn_category_id: '',
      price: 0,
      active: true,
    },
    validate: (data) => {
      let errors: any = {};
      if (!data.name) {
        errors.name = i18n.t('isRequired', { input: i18n.t('addonName') });
      }

      if (!data.addOn_category_id) {
        errors.addOn_category_id = i18n.t('isRequired', {
          input: i18n.t('addonCategory'),
        });
      }
      return errors;
    },
    onSubmit: (data: any) => {
      data.currency_type = currency
      dispatch(updateAddons(addon.id, data));
    },
  });

  useEffect(() => {
    if (!addonCatSuccess) dispatch(listAddonCategory());

    if (auth.hasRoles(['admin'])) {
      if (!owners || (owners.items.length === 0 && !ownersSuccess)) {
        dispatch(listRestaurantOwners())
      }
    }

    if ((!successFind || addon.id !== router.query.id) && router.query.id) {

      dispatch(findAddons(router.query.id));
    }

    if (successFind && addon.id === router.query.id) {
      setData(true);
      const match = addonCategoryList.items.filter(
        (addonCategory) => addonCategory.id === addon.add_on_category
      );
      if (match.length != 0)
        formik.values.addOn_category_id = match[0].id;

      formik.values.name = addon.name;
      formik.values.price = addon.price;
      setCurrency(addon.currency_type ?? 'TRY')
      formik.values.create_user_id = addon.create_user_id;
    }

    if (successUpdate) {
      setData(false);
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: i18n.t('success'),
      });
      setTimeout(() => { router.push('/addons') }, 2000)
      dispatch({ type: addonsTypes.ADDON_UPDATE_RESET });
      dispatch({ type: addonsTypes.ADDON_FIND_RESET });
    }

    if (!supportedCountries) {
      dispatch(getSupportedCountries())
  }

  }, [dispatch, successUpdate, addonCatSuccess, successFind, owners, supportedCountries]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid,
  };
  return (
    <div id='create_Add_ons'>
      <BackBtn router={router} />
      <h1 id='createHeader'>{i18n.t('editAddon')}</h1>
      <Toast id='toastMessage' ref={toast}></Toast>
      {addonCatSuccess && addonCategoryList && successFind && (
        <form onSubmit={formik.handleSubmit}>
          <S.ContainerCard id='createContainer'>
            <div className='p-grid'>
              <FormColumn divideCount={3}>
                <InputGroup>
                  <InputContainer
                    label={i18n.t('addonName')}
                    name='name'
                    formiks={inputFormiks}
                    component={InputText}
                    iprops={{
                      value: formik.values.name,
                      onChange: formik.handleChange,
                    }}
                  />
                </InputGroup>
                {
                  auth.hasRoles(['admin']) &&
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
                }
                <h4 id='addonCatHeader'>{i18n.t('addonCategory')}</h4>
                <Dropdown
                  id='addOn_category_id'
                  name='addOn_category_id'
                  value={formik.values.addOn_category_id}
                  options={addonCategoryList.items}
                  optionValue='id'
                  onChange={formik.handleChange}
                  optionLabel='name'
                  placeholder='Select an addon category'
                  autoFocus
                  className={classNames({
                    'p-invalid': isFormFieldValid('addOn_category_id '),
                  })}
                />
                <label
                  id='addonCatError'
                  htmlFor='addOn_category_id '
                  className={classNames({
                    'p-error': isFormFieldValid('addOn_category_id '),
                  })}
                ></label>
                {getFormErrorMessage('addOn_category_id ')}
              </FormColumn>
              <FormColumn divideCount={3}>
                <InputGroup>
                  <InputContainer label={i18n.t('price')} name="price" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                    value: formik.values.price,
                    onValueChange: formik.handleChange,
                    min: 0,
                    mode: "currency",
                    currency: currency,
                    showButtons: true
                  }}
                  />
                  <InputContainer label={i18n.t('currencyCode')} name="currency_type" size={6} formiks={inputFormiks} component={Dropdown} iprops={{
                    options: Object.values(supportedCountries).map(country => country['currency_name_alt']),
                    value: currency,
                    onChange: e => setCurrency(e.value)
                  }} />
                </InputGroup>
              </FormColumn>
            </div>
            <S.SubmitBtn>
              <Button id='btnCreate' type='submit' label={i18n.t('submit')} />
            </S.SubmitBtn>
          </S.ContainerCard>
        </form>
      )}
    </div>
  );
};

export default Index;
