import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { useFormik } from 'formik';
import { createRestaurant, findRestaurant, listRestaurantOwners, updateRestaurant } from "../../../store/actions/restaurant.action";
import { restaurantsTypes } from "../../../store/types/restaurants.type";
import { TabPanel, TabView } from "primereact/tabview";
import FoodsTable from "../../tables/foodsTable";
import FormColumn from "../../inputs/formColumn";
import InputContainer from "../../inputs/inputContainer";
import { i18n } from "../../../language";
import InputGroup from "../../inputs/inputGroup";
import * as S from '../../../styles/restaurants/restaurants.create.style'
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import StandardFileUpload from "../../inputs/fileUpload";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Tooltip } from 'primereact/tooltip';
import Loading from "../../Loading";
import CouponsTable from "../../tables/couponsTable";
import { Tag } from "primereact/tag";
import { getSupportedCountries } from "../../../store/actions/addresses.action";
import { ProgressSpinner } from "primereact/progressspinner";
import OpenHoursPage from "../../settingsOwner/openHoursPage";
import auth from "../../../helpers/core/auth";
import {getLibyanCities, getTurkishCities, getLibyanDistricts, getTurkishDistricts } from "../../../helpers/cities"

const RestaurantDataInput = (props) => {

    const toast = useRef(null);
    const [resOwnersName, setResOwnersName] = useState([" "]);

    const dispatch = useDispatch();
    const router = useRouter();

    const [selectedResOwner, setSelectedResOwner] = useState(null);
    const [reloadCheck, setReloadCheck] = useState(false);

    const resOwnersList = useSelector((state: RootState) => state.listResOwners);
    const resDetails = useSelector((state: RootState) => state.findRestaurant);
    const updatedRestaurant = useSelector((state: RootState) => state.updateRestaurant);
    const restaurantCreate = useSelector((state: RootState) => state.createRestaurant);
    const { success: restaurantCreateSuccess, error } = restaurantCreate;

    const { loading: loadingUpdate, success: successUpdate } = updatedRestaurant;
    const { loading, success: resOnwersSuccess, restaurantOwners: resOwnerslist } = resOwnersList;
    const { loading: resLoading, success: resSuccess, restaurant } = resDetails;

    const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
    const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

    const [adminsDefaultImage, setAdminsDefaultImage] = useState(false)

    //setting names for dropdowns.
    const settingDropDownNames = () => {
        const sortedResOwners = resOwnerslist?.items.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
        const restOnwersName = sortedResOwners?.map(resOwner => { return { id: resOwner.id, name: resOwner.name } });
        setResOwnersName(restOnwersName);
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const defaultInitialValues = {
        owner_id: '',
        for_two: 10,
        name: '',
        description: '',
        image: '',
        address: '',
        full_address: '',
        postal_code: '',
        phone: '',
        email: '',
        rating: 0,
        delivery_time: 0,
        commission_rate: 0,
        license_code: '',
        restaurant_charges: 0,
        delivery_radius: 0,
        is_veg: false,
        featured: false,
        active: false,
        is_agreement: true,
        minimum_order_amount: 0,
        latitudeInt: 0,
        longitudeInt: 0,
        city: '',
        town: '',
        longitude: 0.0,
        latitude: 0.0,
        is_open: false,
        country_code: "",
        // currency_type:'tl'
    }

    const formik = useFormik({
        initialValues: defaultInitialValues,
        validate: (data) => {
            let errors: any = {};

            if (!data.name) {
                errors.name = i18n.t('isRequired', { input: i18n.t('restaurantName') });
            }

            if (/^\d+$/.test(data.description)) {
                errors.description = i18n.t('onlyNumberError');
            }

            if (!data.phone) {
                errors.phone = i18n.t('isRequired', { input: i18n.t('phoneNumber') });
            }

            if (!data.full_address) {
                errors.full_address = i18n.t('isRequired', { input: i18n.t('fullAddress') });
            }

            if (!data.email) {
                errors.email = i18n.t('isRequired', { input: i18n.t('email') });
            }

            if (!data.rating) {
                errors.rating = i18n.t('isRequired', { input: i18n.t('rating') });
            }

            if (!data.delivery_time) {
                errors.delivery_time = i18n.t('isRequired', { input: i18n.t('approximateDeliveryTime') });
            }

            if (!data.commission_rate) {
                errors.commission_rate = i18n.t('isRequired', { input: i18n.t('commissionRate') });
            }

            if (!data.delivery_radius) {
                errors.delivery_radius = i18n.t('isRequired', { input: i18n.t('deliveryRadius') });
            }

            if (!data.owner_id) {
                errors.owner_id = i18n.t('isRequired', { input: i18n.t('restaurantOwner') });
            }

            if (!data.country_code) {
                errors.country_code = i18n.t('isRequired', { input: i18n.t('country') });
            }


            if (!data.restaurant_charges) {
                data.restaurant_charges = 0;
            }

            if (!data.minimum_order_amount) {
                errors.minimum_order_amount = i18n.t('isRequired', { input: i18n.t('minimumAmount') });
            }

            if (!data.latitudeInt) {
                errors.latitudeInt = i18n.t('isRequired', { input: i18n.t('latitude') });
            }
            else {
                formik.values.latitude = formik.values.latitudeInt?.toString()
            }
            if (!data.longitudeInt) {
                errors.longitudeInt = i18n.t('isRequired', { input: i18n.t('longitude') });
            }
            else {
                formik.values.longitude = formik.values.longitudeInt?.toString();
            }
            return errors;
        },
        onSubmit: (data: any) => {

            let tmpData = { ...data };
            if (tmpData.image.length == 0 && !restaurant?.image) {
                delete tmpData.image;
            }

            // tmpData.license_code = "";
            // tmpData.image = "";

            tmpData.is_veg = tmpData.is_veg || false;
            tmpData.featured = tmpData.featured || false;
            tmpData.active = tmpData.active || false;
            tmpData.is_open = tmpData.is_open || false;

            let address: any = {
                full_address: tmpData.full_address,
                latitude: tmpData.latitude,
                longitude: tmpData.longitude,
                city: tmpData.city ,
                state: tmpData.town,
                postal_code: tmpData.postal_code,
                country_code: tmpData.country_code,
                
                country: tmpData.country_code === 'TR' ? 'Turkey' : (tmpData.country_code === 'LY' ? 'Libya' : '')
            }

            if (props.updating) {
                address.id = restaurant.address.id;
            }

            delete tmpData.latitudeInt;
            delete tmpData.longitudeInt;
            delete tmpData.longitude;
            delete tmpData.latitude;
            delete tmpData.city;
            delete tmpData.town;
            delete tmpData.owner_name;

            tmpData = { ...tmpData, address: { ...address } };
            if (props.updating) {
                if (adminsDefaultImage){
                    tmpData.image = ''
                }
                dispatch(updateRestaurant(props.id, tmpData));
            } else if (props.creating) {
                dispatch(createRestaurant(tmpData));
            }
        }
    });

    useEffect(() => {
        if (error) {
            dispatch({
                type: restaurantsTypes.RESTAURAT_CREATE_RESET
            })
        }
        if (resOnwersSuccess && resSuccess && props.updating) {
            if (restaurant.id === props.id) {
                setReloadCheck(true);
            }
            else {
                setReloadCheck(false);
            }
        }
        if (!supportedCountries) {
            dispatch(getSupportedCountries())
        }
        if (!reloadCheck || props.creating) {
            formik.values = defaultInitialValues
            formik.resetForm()
            setReloadCheck(!reloadCheck)
            dispatch(listRestaurantOwners());
            if (props.updating) {
                dispatch(findRestaurant(props.id));
            }
        }
        if (successUpdate) {
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('updatedRestaurant') })
            dispatch({ type: restaurantsTypes.RESTAURAT_UPDATE_RESET });
            dispatch({ type: restaurantsTypes.RESTAURAT_FIND_RESET });
            setTimeout(() => { router.push('/restaurants') }, 1000)
        }
        if (restaurantCreateSuccess) {
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('addedRestaurant') })
            dispatch({ type: restaurantsTypes.RESTAURAT_CREATE_RESET });
            setTimeout(() => { router.push('/restaurants') }, 1000)
        }

        // if(error){
        //     toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: error })
        // }

    }, [dispatch, props, successUpdate, restaurantCreateSuccess]);

    useEffect(() => {

        if (resOnwersSuccess) {
            settingDropDownNames();
        }

        if (resOnwersSuccess && resSuccess && props.updating) {
            setSelectedResOwner(() => {
                let selectedResOwners = resOwnerslist?.items.filter(data => { return data.name.localeCompare(restaurant.name) == 0; });
                return selectedResOwners[0];
            })
            formik.values.owner_id = restaurant.owner?.id;
            formik.values.name = restaurant.name;
            formik.values.image = restaurant.image;
            formik.values.description = restaurant.description;
            formik.values.email = restaurant.email;
            formik.values.phone = restaurant.phone;
            formik.values.full_address = restaurant.address.full_address;
            formik.values.city = restaurant.address.city;
            {
                restaurant.address.country_code =='TR'&&
                    handleTrCityUpdate(restaurant.address.city);
            }
            {
                restaurant.address.country_code =='LY'&&
                    handleLyCityUpdate(restaurant.address.city);
            }
            formik.values.town = restaurant.address.state;
            formik.values.rating = restaurant.rating;
            formik.values.delivery_time = restaurant.delivery_time;
            formik.values.latitude = restaurant.address.latitude;
            formik.values.longitude = restaurant.address.longitude;
            formik.values.latitudeInt = restaurant.address.latitude;
            formik.values.longitudeInt = restaurant.address.longitude;
            formik.values.postal_code = restaurant.address.postal_code;
            formik.values.commission_rate = restaurant.commission_rate;
            formik.values.license_code = restaurant.license_code;
            formik.values.restaurant_charges = restaurant.restaurant_charges;
            formik.values.delivery_radius = restaurant.delivery_radius;
            formik.values.minimum_order_amount = restaurant.minimum_order_amount;
            formik.values.is_veg = restaurant.is_veg;
            formik.values.active = restaurant.active;
            formik.values.is_open = restaurant.is_open;
            formik.values.featured = restaurant.featured;
            formik.values.foods = restaurant.foods;
            formik.values.country_code = restaurant.address.country_code;
        }
    }, [resOnwersSuccess, resSuccess])


    const TrCities = getTurkishCities();
    const LyCities = getLibyanCities();

    const [TrDistricts, setTrDistricts] = useState([]);
    const [LyDistricts, setLyDistricts] = useState([]);

    const handleTrCityUpdate = (cityName) => {

        formik.values.town_id = '';
        const cityIdFilter = TrCities.filter((c)=> c.name===cityName)
    
        if(cityIdFilter.length!=0){
        const filteredDistricts = getTurkishDistricts()?.filter((k) => k.il_id === cityIdFilter[0].id)

        setTrDistricts(filteredDistricts);
        }
    }
    const handleLyCityUpdate = (cityName) => {

        formik.values.town_id = '';
        const cityIdFilter = LyCities.filter((c)=> c.name===cityName)
    
        if(cityIdFilter.length!=0){
        const filteredDistricts = getLibyanDistricts()?.filter((k) => k.il_id === cityIdFilter[0].id)

        setLyDistricts(filteredDistricts);
        }
    }

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }
    const generalTabPanel = () => {
        return <TabPanel header={props.creating ? i18n.t('createRestaurant') : i18n.t('editRestaurant')}>
            <S.ContainerCard>
                <form onSubmit={formik.handleSubmit} >
                    <div className="p-grid">
                        <FormColumn divideCount={3}>
                            <h2>{i18n.t('general')}</h2>

                            <InputGroup>
                                <InputContainer label={i18n.t('name')} name="name" formiks={inputFormiks} component={InputText} iprops={{
                                    value: formik.values.name,
                                    onChange: formik.handleChange,
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('restaurantOwner')} name="owner_id" formiks={inputFormiks} component={Dropdown} iprops={{
                                    value: formik.values.owner_id,
                                    onChange: (e) => { formik.values.owner_name = e.originalEvent.target.innerText; formik.handleChange(e); },
                                    options: resOwnersName,
                                    filter: true,
                                    filterBy: "name",
                                    placeholder: i18n.t('selectAnOwner'),
                                    optionLabel: "name",
                                    optionValue: "id",
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('telephone')} name="phone" formiks={inputFormiks} size={6} component={InputText} iprops={{
                                    value: formik.values.phone,
                                    placeholder: i18n.t('telephone'),
                                    onChange: formik.handleChange,
                                }} />

                                <InputContainer label={i18n.t('email')} name="email" formiks={inputFormiks} size={6} component={InputText} iprops={{
                                    value: formik.values.email,
                                    onChange: formik.handleChange,
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

                            {
                                auth.hasRoles(['admin']) && props.updating &&
                                <InputContainer label={i18n.t('replaceImageWithDefault')} name="replaceImageWithDefault" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                                    checked: adminsDefaultImage,
                                    onChange: (e) => setAdminsDefaultImage(e.target.value),
                                    tooltip: i18n.t('thisFeatureIsForAdminsToReplaceLegacyImages')
                                }} />
                            }
                            {
                                !adminsDefaultImage &&
                                <InputGroup>
                                    <InputContainer label={i18n.t('image')} name="image" formiks={inputFormiks} size={12} component={StandardFileUpload} iprops={{
                                        setFile: (image) => { formik.values.image = image },
                                        showSuccess: () => { toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' }); }
                                    }} />
                                </InputGroup>
                            }
                        </FormColumn>
                        <FormColumn divideCount={3}>
                            <h2>{i18n.t('addressInformation')}</h2>

                            <InputGroup>
                                {supportedCountriesLoading && <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} />}
                                {supportedCountriesSuccess &&

                                    <InputContainer label={i18n.t('country')} name="country_code" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                        value: formik.values.country_code,
                                        onChange: formik.handleChange,
                                        //options: [{ label: 'Turkey', value: 'TR' }, { label: 'Libya', value: 'LY' }],
                                        options: Object.keys(supportedCountries).map((key) => { return { label: supportedCountries[key].native_name, value: key } })
                                    }} />}

                                <InputContainer label={i18n.t('postalCode')} name="postal_code" formiks={inputFormiks} size={6} component={InputText} iprops={{
                                    value: formik.values.postal_code,
                                    onChange: formik.handleChange,
                                }} />
                            </InputGroup>

                            {
                                formik.values.country_code === 'TR' &&
                                <InputGroup>
                                    <InputContainer label={i18n.t('city')} name="city" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                        value: formik.values.city,
                                        onChange: (e) => { handleTrCityUpdate(e.value); formik.handleChange(e); },
                                        options: TrCities,
                                        placeholder: i18n.t('city'),
                                        filter: true,
                                        filterBy: "name",
                                        optionLabel: "name",
                                        optionValue: "name",
                                    }} />

                                    <InputContainer label={i18n.t('district')} name="town" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                        value: formik.values.town,
                                        onChange: formik.handleChange,
                                        options: TrDistricts,
                                        placeholder: i18n.t('district'),
                                        filter: true,
                                        filterBy: "name",   
                                        optionLabel: "name",
                                        optionValue: "name"
                                    }} />
                                </InputGroup>
                            }
                            {
                                formik.values.country_code === 'LY' &&
                                <InputGroup>
                                    <InputContainer label={i18n.t('city')} name="city" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                        value: formik.values.city,
                                        onChange: (e) => { handleLyCityUpdate(e.value); formik.handleChange(e); },
                                        options: LyCities,
                                        placeholder: i18n.t('city'),
                                        filter: true,
                                        filterBy: "name",
                                        optionLabel: "name",
                                        optionValue: "name",
                                    }} />

                                    <InputContainer label={i18n.t('district')} name="town" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                        value: formik.values.town,
                                        onChange: formik.handleChange,
                                        options: LyDistricts,
                                        placeholder: i18n.t('district'),
                                        filter: true,
                                        filterBy: "name",   
                                        optionLabel: "name",
                                        optionValue: "name"
                                    }} />
                                </InputGroup>
                            }

                            <InputGroup>
                                <InputContainer label={i18n.t('latitude')} name="latitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.latitudeInt,
                                    onValueChange: formik.handleChange,
                                    mode: "decimal",
                                    min: -90,
                                    max: 90,
                                    minFractionDigits: 4,
                                    maxFractionDigits: 8,
                                    showButtons: true,
                                }} />

                                <InputContainer label={i18n.t('longitude')} name="longitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.longitudeInt,
                                    onValueChange: formik.handleChange,
                                    mode: "decimal",
                                    min: -180,
                                    max: 180,
                                    minFractionDigits: 4,
                                    maxFractionDigits: 8,
                                    showButtons: true,
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('fullAddress')} name="full_address" formiks={inputFormiks} component={InputTextarea} iprops={{
                                    value: formik.values.full_address,
                                    onChange: formik.handleChange,
                                    rows: 3,
                                    autoResize: true
                                }} />
                            </InputGroup>
                        </FormColumn>
                        <FormColumn divideCount={3}>
                            <h2>Restoran Ayarları</h2>

                            <InputGroup>
                                <InputContainer label={i18n.t('approximateDeliveryTime')} name="delivery_time" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.delivery_time,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min: 0,
                                    suffix: ' min'
                                }} />

                                <InputContainer label={i18n.t('deliveryRadius')} name="delivery_radius" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.delivery_radius,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min: 0,
                                    suffix: ' km'
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('commissionRate')} name="commission_rate" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.commission_rate,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min: 0,
                                    suffix: ' %'
                                }} />

                                <InputContainer label={i18n.t('restaurantFee')} name="restaurant_charges" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.restaurant_charges,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min: 0,
                                    //suffix: ' ₺'
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('minimumAmount')} name="minimum_order_amount" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.minimum_order_amount,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min: 0,
                                    //suffix: ' ₺'
                                }} />

                                <InputContainer label={i18n.t('rating')} name="rating" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.rating,
                                    onValueChange: formik.handleChange,
                                    min: 0,
                                    max: 5,
                                    showButtons: true,
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('licenseCode')} name="license_code" formiks={inputFormiks} size={12} component={InputText} iprops={{
                                    value: formik.values.license_code,
                                    onChange: formik.handleChange
                                }} />

                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('vegetablesOnly')} name="is_veg" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                                    value: formik.values.is_veg,
                                    checked: formik.values.is_veg,
                                    onChange: formik.handleChange
                                }} />

                                <InputContainer label={i18n.t('prioritized')} name="featured" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                                    value: formik.values.featured,
                                    checked: formik.values.featured,
                                    onChange: formik.handleChange
                                }} />

                                <InputContainer label={i18n.t('open')} name="is_open" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                                    value: formik.values.is_open,
                                    checked: formik.values.is_open,
                                    onChange: formik.handleChange
                                }} />

                                <InputContainer label={i18n.t('active')} name="active" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                                    value: formik.values.active,
                                    checked: formik.values.active,
                                    onChange: formik.handleChange
                                }} />
                            </InputGroup>
                        </FormColumn>
                    </div>

                    <S.SubmitBtn>
                        <Button type="submit" label="Gönder" />
                    </S.SubmitBtn>
                </form>
                {error && <div><Tag severity="danger" value={error}></Tag></div>}
            </S.ContainerCard>
        </TabPanel>
    }

    if (props.updating && resLoading)
        return <Loading />
    return (
        <div id="edit_restaurant">
            <h1 id="editHeader">{props.creating ? i18n.t('createRestaurant') : i18n.t('editRestaurant')}</h1>
            <Toast id="toastMessage" ref={toast}></Toast>
            {

                props.updating ?
                    <TabView>
                        {generalTabPanel()}
                        <TabPanel header={i18n.t('meals')}>
                            <FoodsTable foods={formik.values.foods} resid={props.id} />
                        </TabPanel>
                        <TabPanel header={i18n.t("workingHours")} >
                            <OpenHoursPage comingResData={restaurant} />
                        </TabPanel>
                    </TabView>
                    :
                    <TabView>
                        {generalTabPanel()}
                    </TabView>
            }
        </div>
    )
}

export default RestaurantDataInput;
