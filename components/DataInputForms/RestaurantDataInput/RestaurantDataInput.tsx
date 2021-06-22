import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { useFormik } from 'formik';
import { createRestaurant, findRestaurant, listRestaurantOwners, updateRestaurant } from "../../../store/actions/restaurant.action";
import { listFoodByRestaurant } from "../../../store/actions/foods.action";
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

import jsonCities from "../../../public/data/il.json";
import jsonDistricts from "../../../public/data/ilce.json";
import Loading from "../../Loading";
import CouponsTable from "../../tables/couponsTable";

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
    const { success: restaurantCreateSuccess } = restaurantCreate;
   
    const { loading: loadingUpdate, success: successUpdate } = updatedRestaurant;
    const { loading, success: resOnwersSuccess, restaurantOwners: resOwnerslist } = resOwnersList;
    const { loading: resLoading, success: resSuccess, restaurant } = resDetails;
   
    //setting names for dropdowns.
    const settingDropDownNames = () => {
        const sortedResOwners = resOwnerslist.items.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
        const restOnwersName = sortedResOwners.map(resOwner => { return { id: resOwner.id, name: resOwner.name } });
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
        address:'',
        postal_code:'',
        phone: '',
        email: '',
        rating: 0,
        delivery_time: 0,
        commission_rate: 0,
        license_code: '',
        file: '',
        restaurant_charges: 0,
        delivery_radius: 0,
        is_veg: false,
        featured: false,
        active: false,
        is_agreement: true,
        minimum_order_amount: 0,
        latitudeInt: 0,
        longitudeInt: 0,
        city_id: 0,
        town_id: 0,
        longitude: 0.0,
        latitude: 0.0,
        is_open: false,
        currency_type:'TL',
    }

    const formik = useFormik({
        initialValues: defaultInitialValues,
        validate: (data) => {
            let errors: any = {};

            if (!data.name) {
                errors.name = i18n.t('isRequired', { input: i18n.t('restaurantName') });
            }
            if (!data.description) {
                errors.description = i18n.t('isRequired', { input: i18n.t('description') });
            }

            if (!data.phone) {
                errors.phone = i18n.t('isRequired', { input: i18n.t('phoneNumber') });
            }

            if (!data.address) {
                errors.address = i18n.t('isRequired', { input: i18n.t('fullAddress') });
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

            if (!data.city_id) {
                errors.city_id = i18n.t('isRequired', { input: i18n.t('city') });
            }

            if (!data.town_id) {
                errors.town_id = i18n.t('isRequired', { input: i18n.t('district') });
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

            const address = {
                full_address:data.address,
                latitude: data.latitude,
                longitude: data.longitude,
                city:data.city_id,
                state:data.town_id
            }

            delete data.latitudeInt;
            delete data.longitudeInt;
            delete data.city_id;
            delete data.town_id;

            data = {...data, address:{...address}};

            if (props.updating) {
                dispatch(updateRestaurant(props.id, data));
            } else if (props.creating) {
                dispatch(createRestaurant(data));
            }
        }
    });

    useEffect(() => {
        if (resOnwersSuccess && resSuccess && props.updating) {
            if (restaurant.id === props.id) {
                setReloadCheck(true);
            }
            else {
                setReloadCheck(false);
            }
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

    }, [dispatch, props, successUpdate, restaurantCreateSuccess]);

    useEffect(() => {

        if (resOnwersSuccess) {
            settingDropDownNames();
        }

        if (resOnwersSuccess && resSuccess && props.updating) {
            setSelectedResOwner(() => {
                let selectedResOwners = resOwnerslist.items.filter(data => { return data.name.localeCompare(restaurant.name) == 0; });
                return selectedResOwners[0];
            })
       
            formik.values.owner_id = restaurant.owner?.id;
            formik.values.name = restaurant.name;
            formik.values.description = restaurant.description;
            formik.values.email = restaurant.email;
            formik.values.phone = restaurant.phone;
            formik.values.address = restaurant.address.full_address;
            formik.values.city_id = restaurant.address.city;
            handleCityUpdate(restaurant.address.city);
            formik.values.town_id = restaurant.address.state;
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

        }
    }, [resOnwersSuccess, resSuccess])


    const cities = jsonCities;

    const [districts, setDistricts] = useState([]);

    const handleCityUpdate = (cityId) => {

        formik.values.town_id = 0;

        const filteredDistricts = jsonDistricts.filter((k) => k.il_id === cityId)

        setDistricts(filteredDistricts);
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
                                <InputContainer label={i18n.t('telephone')} name="phone" formiks={inputFormiks} size={6} component={InputMask} iprops={{
                                    value: formik.values.phone,
                                    mask: "(999) 999-9999",
                                    placeholder: "(999) 999-9999",
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

                            <InputGroup>
                                <InputContainer label={i18n.t('image')} name="image" formiks={inputFormiks} size={12} component={StandardFileUpload} iprops={{
                                    setFile: (image) => {formik.values.image = image },
                                    showSuccess: () => { toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' }); }
                                }} />
                            </InputGroup>
                        </FormColumn>
                        <FormColumn divideCount={3}>
                            <h2>{i18n.t('addressInformation')}</h2>

                            <InputGroup>
                                <InputContainer label={i18n.t('city')} name="city_id" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                    value: formik.values.city_id,
                                    onChange: (e) => { handleCityUpdate(e.value); formik.handleChange(e); },
                                    options: cities,
                                    placeholder: i18n.t('city'),
                                    filter: true,
                                    filterBy: "name",
                                    optionLabel: "name",
                                    optionValue: "id",
                                }} />

                                <InputContainer label={i18n.t('district')} name="town_id" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                    value: formik.values.town_id,
                                    onChange: formik.handleChange,
                                    options: districts,
                                    placeholder: i18n.t('district'),
                                    filter: true,
                                    filterBy: "name",
                                    optionLabel: "name",
                                    optionValue: "id"
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('postalCode')} name="postal_code" formiks={inputFormiks} size={6} component={InputText} iprops={{
                                    value: formik.values.postal_code,
                                    onChange: formik.handleChange,
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('latitude')} name="latitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.latitudeInt,
                                    onValueChange: formik.handleChange,
                                    mode:"decimal",
                                    min:-90,
                                    max:90,
                                    minFractionDigits:4,
                                    maxFractionDigits:8,
                                    showButtons: true,
                                }} />

                                <InputContainer label={i18n.t('longitude')} name="longitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.longitudeInt,
                                    onValueChange: formik.handleChange,
                                    mode:"decimal",
                                    min:-180,
                                    max:180,
                                    minFractionDigits:4,
                                    maxFractionDigits:8,
                                    showButtons: true,
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('fullAddress')} name="address" formiks={inputFormiks} component={InputTextarea} iprops={{
                                    value: formik.values.address,
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
                                    min:0,
                                    suffix: ' min'
                                }} />

                                <InputContainer label={i18n.t('deliveryRadius')} name="delivery_radius" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.delivery_radius,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min:0,
                                    suffix: ' km'
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('commissionRate')} name="commission_rate" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.commission_rate,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min:0,
                                    suffix: ' %'
                                }} />

                                <InputContainer label={i18n.t('restaurantFee')} name="restaurant_charges" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.restaurant_charges,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min:0,
                                    suffix: ' ₺'
                                }} />
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label={i18n.t('minimumAmount')} name="minimum_order_amount" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.minimum_order_amount,
                                    onValueChange: formik.handleChange,
                                    showButtons: true,
                                    min:0,
                                    suffix: ' ₺'
                                }} />

                                <InputContainer label={i18n.t('rating')} name="rating" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value: formik.values.rating,
                                    onValueChange: formik.handleChange,
                                    min:0,
                                    max:5,
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
            </S.ContainerCard>
        </TabPanel>
    }

    if (props.updating && resLoading)
        return <Loading />

        console.log(formik.values);
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
