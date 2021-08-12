import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { listAddons } from '../../../store/actions/addons.action';
import { listAddonCategory } from '../../../store/actions/addon-category.action';
import { createAddons } from '../../../store/actions/addons.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { i18n } from '../../../language';
import FormColumn from '../../../components/inputs/formColumn';
import InputGroup from '../../../components/inputs/inputGroup';
import InputContainer from '../../../components/inputs/inputContainer';
import { useRouter } from 'next/dist/client/router';
import { addonsTypes } from '../../../store/types/addons.type';
import { Toast } from 'primereact/toast';
import auth from '../../../helpers/core/auth';
import { listRestaurantOwners } from '../../../store/actions/userslists.action';
import BackBtn from '../../../components/backBtn';
import { getSupportedCountries } from '../../../store/actions/addresses.action';

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);

  const [addonCategoryName, setAddonCategoryName] = useState(null);

  const resAddonCat = useSelector(
    (state: RootState) => state.listAddonCategory
  );
  const { success: addonCatSuccess, addonCat: addonCatlist } = resAddonCat;

  const createAddon = useSelector((state: RootState) => state.createAddons);
  const { success: createAddOnSuccess, error: createAddOnError } = createAddon;

  const listOwnersState = useSelector((state: RootState) => state.listRestaurantOwners)
  const { loading: loadingOwners, success: ownersSuccess, restaurantOwners: owners } = listOwnersState

  const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
  const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

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
      addonCat: '',
      price: 0,
      active: true,
    },
    validate: (data) => {
      let errors: any = {};
      if (!data.name) {
        errors.name = i18n.t('isRequired', { input: i18n.t('addonName') });
      }

      if (!data.addonCat) {
        errors.addonCat = i18n.t('isRequired', {
          input: i18n.t('addonCategory'),
        });
      } else {
        let selectedAddons = addonCatlist.items.filter((data) => {
          return data.name.localeCompare(formik.values.addonCat.name) == 0;
        });
        if (selectedAddons != null)
          formik.values.addOn_category_id = selectedAddons[0]?._id;
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
      const addonCreateDto = {
        add_on_category_id: data.addonCat,
        name: data.name,
        price: data.price,
        currency_type: currency,
        active: data.active,
        create_user_id: data.create_user_id
      };
      dispatch(createAddons(addonCreateDto));
    },
  });
  //setting names for dropdowns.
  const settingDropDownNames = () => {
    const addonCatName = addonCatlist.items.map((res) => {
      return { id: res.id, name: res.name };
    });
    setAddonCategoryName(addonCatName);
  };

  useEffect(() => {
    if (!addonCatSuccess) dispatch(listAddonCategory());

    if (addonCatSuccess) settingDropDownNames();

    if (auth.hasRoles(['admin'])) {
      if (!owners || (owners.items.length === 0 && !ownersSuccess)) {
        dispatch(listRestaurantOwners())
      }
    }

    if (createAddOnSuccess) {
      toast.current.show({
        severity: 'success',
        summary: i18n.t('success'),
        detail: i18n.t('success'),
      });
      setTimeout(() => { router.push('/addons') }, 2000)
      dispatch({ type: addonsTypes.ADDON_CREATE_RESET });
    } else if (createAddOnError) {
      toast.current.show({
        severity: 'error',
        summary: i18n.t('error'),
        detail: createAddOnError,
      });
    }

    if (!supportedCountries) {
      dispatch(getSupportedCountries())
    }
  }, [addonCatSuccess, createAddOnSuccess, owners, supportedCountries]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid,
  };

  return (
    <div id='create_Add_ons'>
      <BackBtn router={router} />
      <Toast id='toastMessage' ref={toast}></Toast>
      <h1 id='createHeader'>{i18n.t('createAddon')}</h1>
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
                      options: owners?.items.map((one) => { return { label: one.name, value: one.id } }),
                      filter: true,
                      filterBy: "label",
                    }}
                  />
                </InputGroup>
              }
              <h4 id='addonCatHeader'>{i18n.t('addonCategory')}</h4>
              <Dropdown
                id='addonCat'
                name='addonCat'
                value={formik.values.addonCat}
                options={addonCategoryName}
                optionValue='id'
                onChange={formik.handleChange}
                optionLabel='name'
                placeholder='Select an addon category'
                autoFocus
                filter
                filterBy= "name"
                className={classNames({
                  'p-invalid': isFormFieldValid('addonCat'),
                })}
              />
              <label
                id='addonCatError'
                htmlFor='addonCat'
                className={classNames({
                  'p-error': isFormFieldValid('addonCat'),
                })}
              ></label>
              {getFormErrorMessage('addonCat')}
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
                  options: Object.values(supportedCountries ?? {}).map(country => country['currency_name_alt']),
                  value: currency,
                  onChange: e => setCurrency(e.value)
                }} />

              </InputGroup>
            </FormColumn>
            <S.SubmitBtn>
              <Button id='btnCreate' type='submit' label={i18n.t('submit')} />
            </S.SubmitBtn>
          </div>
        </S.ContainerCard>
      </form>
    </div>
  );
};

export default Index;
