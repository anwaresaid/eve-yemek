import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import * as S from '../../styles/restaurants/restaurants.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import {updateRestaurant} from '../../store/actions/restaurant.action';
import {listRestaurantOwners} from '../../store/actions/restaurant.action';
import {findRestaurant} from '../../store/actions/restaurant.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { InputMask } from 'primereact/inputmask';
import { restaurantsTypes } from '../../store/types/restaurants.type';
import {useRouter} from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames'
import { TabPanel, TabView } from 'primereact/tabview';
import FoodsTable from '../../components/tables/foodsTable';
import { listFoodByRestaurant } from '../../store/actions/foods.action';
import InputContainer from '../../components/inputs/inputContainer';
import StandardFileUpload from '../../components/inputs/fileUpload';


    const UpdateRestaurants = () => {
// settign variables
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [resOwnersName, setResOwnersName] = useState([" "]);

    const dispatch = useDispatch();
    const router = useRouter();
//setting dropdown selected items
    const [selectedResOwner, setSelectedResOwner] = useState(null);
    const [reloadCheck, setReloadCheck] = useState(false);

//use selectors for setting dispatch to variable.

    const resOwnersList = useSelector((state:RootState) => state.listResOwners);
    const resDetails = useSelector((state:RootState) => state.findRestaurant);
    const updatedRestaurant = useSelector((state:RootState) => state.updateRestaurant);
    const listFood = useSelector((state:RootState) => state.listFoodByRestaurant);

    const { loading: loadingUpdate, success: successUpdate } = updatedRestaurant;
    const { loading, success:resOnwersSuccess, restaurantOwners: resOwnerslist } = resOwnersList;
    const { loading: resLoading, success:resSuccess, restaurant} = resDetails;
    const { loading: foodLoading, success:foodSuccess, foods} = listFood;

//setting names for dropdowns.
    const settingDropDownNames= () => {
        const sortedResOwners = resOwnerslist.items.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
        const restOnwersName = sortedResOwners.map(resOwner => {return{name: resOwner.name}});
        setResOwnersName(restOnwersName);
       }

       const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
       const getFormErrorMessage = (name) => {
           return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
       };

       const formik = useFormik({
        initialValues:{
            owner_id: '',
            for_two: 10,
            name : '',
            description : '',
            image : 'image url',
            phone : '',
            email : '',
            rating : '',
            delivery_time : '',
            commission_rate : '',
            license_code : '',
            file:'',
            restaurant_charges : '',
            delivery_radius : '',
            is_veg : false,
            featured : false,
            active : false,
            owner : '',
            owner_name : '',
            city : '',
            town : '',
            is_agreement : false,
            minimum_order_amount: '',
            latitudeInt: '',
            longtitudeInt: '',
            city_id:'',
            town_id:'',
            longtitude: '',
            latitude: '',
            is_open: false,

        },
        validate: (data)=>{
            let errors:any = {};

            if (!data.owner_id) {
                errors.owner_id = 'restaurant owner is required.';
            }

            if (!data.name) {
                errors.name = 'restaurant name is required.';
            }
            if (!data.description) {
                errors.description = 'description is required.';
            }
            if (!data.file) {
                errors.file = 'Image is required.';
            }

            if (!data.phone) {
                errors.phone = 'phone number is required.';
            }

            if (!data.email) {
                errors.email = 'email is required.';
            }

            if (!data.rating) {
                errors.rating = 'rating is required.';
            }

            if (!data.delivery_time) {
                errors.delivery_time = 'delivery time is required.';
            }

            if (!data.commission_rate) {
                errors.commission_rate = 'commission rate is required.';
            }

            if (!data.license_code) {
                errors.license_code = 'license code is required.';
            }

            if (!data.restaurant_charges) {
                errors.restaurant_charges = 'charges are required.';
            }

            if (!data.delivery_radius) {
                errors.delivery_radius = 'delivery radius is required.';
            }

            if (!data.owner) {
                errors.owner = 'owner name is required.';
            }
            else
            {
                let selectedResOwners = resOwnersList.restaurantOwners?.items.filter(data  => {return data.name.localeCompare(formik.values.owner.name)==0;});
                formik.values.owner_id = selectedResOwners[0]?._id;
                formik.values.owner_name = formik.values.owner.name;

            }

            if (!data.city) {
                errors.city = 'city is required.';
            }
            else
            {
                formik.values.city_id = data.city.name;
            }

            if (!data.town) {
                errors.town = 'town is required.';
            }
            else
            {
                formik.values.town_id = data.town.name;
            }

            if (!data.minimum_order_amount) {
                errors.minimum_order_amount = 'minimum order amount is required.';
            }

            if (!data.latitudeInt) {
                errors.latitudeInt = 'latitude is required.';
            }
            else
            {
                formik.values.longtitude = formik.values.longtitudeInt?.toString();
            }
            if (!data.longtitudeInt) {
                errors.longtitudeInt = 'longtitude is required.';
            }
            else
            {
                formik.values.latitude = formik.values.latitudeInt?.toString();
            }
            return errors;
        },
        onSubmit: (data:any) => {
            dispatch(updateRestaurant(router.query.id,data));

        }
    });




    useEffect( () => {
        if(resOnwersSuccess&&resSuccess){
        if(restaurant.id === router.query.id){
            setReloadCheck(true);
        }
        else{
            setReloadCheck(false);
        }
    }
        if(!reloadCheck)
        // if(!resOwnerslist)
        {
            dispatch(listRestaurantOwners());
            dispatch(listFoodByRestaurant(router.query.id));
        // if(!restaurant)
            dispatch(findRestaurant(router.query.id));
        }
        if(successUpdate){
            dispatch({type:restaurantsTypes.RESTAURAT_UPDATE_RESET});
            dispatch({type:restaurantsTypes.RESTAURAT_FIND_RESET});
            //router.push('/restaurants');
        }
     }, [dispatch,router.query.id,successUpdate]);

    useEffect(() => {
        if(resOnwersSuccess&&resSuccess){
        settingDropDownNames();
        setSelectedResOwner(()=>{
            let selectedResOwners = resOwnerslist.items.filter(data  => {return data.name.localeCompare(restaurant.name)==0;});
            return selectedResOwners[0];
     })
                    formik.values.owner = {name : restaurant.owner_name};
                    formik.values.name = restaurant.name;
                    formik.values.description = restaurant.description;
                    formik.values.email = restaurant.email;
                    formik.values.city_id = restaurant.city_id;
                    formik.values.town_id = restaurant.town_id;
                    formik.values.rating = restaurant.rating;
                    formik.values.delivery_time = restaurant.delivery_time;
                    formik.values.latitude = restaurant.latitude;
                    formik.values.longitude = restaurant.longitude;
                    formik.values.commission_rate = restaurant.commission_rate;
                    formik.values.license_code = restaurant.license_code;
                    formik.values.restaurant_charges = restaurant.restaurant_charges;
                    formik.values.delivery_radius = restaurant.delivery_radius;
                    formik.values.minimum_order_amount = restaurant.minimum_order_amount;
                    formik.values.is_veg = restaurant.is_veg;
                    formik.values.active = restaurant.active;
                    formik.values.featured = restaurant.featured;
                }
    }, [resOnwersSuccess,resSuccess])

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const counties = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div id="edit_restaurant">
            <h1 id="editHeader">Oluştur</h1>
            <Toast id="toastMessage" ref={toast}></Toast>
            <TabView>
                <TabPanel header="Restoran Duzenle">
            <S.ContainerCard id="container">
                 <form id="editForm" onSubmit = {formik.handleSubmit} >

                    <div className="p-fluid">
                        <div id="nameDiv" className="p-field p-col-12">
                            <h4 id="nameHeader">Ad</h4>
                            <InputText id="name " name="name" value={formik.values.name} onChange={formik.handleChange} type="text" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                            <label id="errorName" htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div id="descritpionDiv" className="p-field p-col-12">
                            <h4 id="descritpionHeader">Açıklama</h4>
                            <InputText id="description" name="description" value={formik.values.description} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })} onChange={formik.handleChange} type="text"/>
                            <label id="errorDescritpion" htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                        <div id="ownerDiv" className="p-field p-col-12">
                            <h4 id="ownerHeader">Restoran Sahibi </h4>
                            <Dropdown  id="owner " name="owner"  value={formik.values.owner} options={resOwnersName} onChange={formik.handleChange} optionLabel="name" placeholder="Select an Owner" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('owner') })} />
                            <label id="errorOwner"  htmlFor="owner" className={classNames({ 'p-error': isFormFieldValid('owner') })}></label>
                            {getFormErrorMessage('owner')}
                        </div>
                    </div>
                    <div id="imageDiv" className="p-field p-col-12">
                    <InputContainer  name="image" label="Görseller" getFormErrorMessage={getFormErrorMessage} isFormFieldValid={isFormFieldValid}>
                        <StandardFileUpload
                                id="fileUpload" 
                                setFile={(image)=>{formik.values.image=image}}
                                showSuccess={()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}}
                            >   
                        </StandardFileUpload>
                    </InputContainer>
                    </div>
                    <div id="phoneDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="phoneHeader">Telefon</h4>
                        <InputMask  id="phone " name="phone"  mask="(999) 999-9999" value={formik.values.phone} placeholder="(999) 999-9999" onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid('phone') })}></InputMask>
                        <label id="errorPhone" htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid('phone') })}></label>
                            {getFormErrorMessage('phone')}
                    </div>
                    <div id="emailDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="emailHeader">Email</h4>
                        <InputText  id="email " name="email"  value={formik.values.email} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                        <label id="errorEmail" htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}></label>
                            {getFormErrorMessage('email')}
                    </div>
                    <div id="cityDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="cityHeader">Şehir</h4>
                        <Dropdown  id="city " name="city"  value={formik.values.city} options={cities} onChange={formik.handleChange} optionLabel="name" placeholder="Şehir" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('city') })} />
                        <label id="errorCity" htmlFor="city" className={classNames({ 'p-error': isFormFieldValid('city') })}></label>
                            {getFormErrorMessage('city')}
                        <h4 id="townHeader">İlçe</h4>
                        <Dropdown  id="town " name="town"  value={formik.values.town} options={counties} onChange={formik.handleChange} optionLabel="name" placeholder="İlçe"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('town') })}/>
                        <label id="errorTown" htmlFor="town" className={classNames({ 'p-error': isFormFieldValid('town') })}></label>
                            {getFormErrorMessage('town')}
                    </div>
                    <div id="ratingDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="ratingHeader">Derece</h4>
                        <InputNumber  id="rating " name="rating"  value={formik.values.rating} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('rating') })}/>
                        <label id="errorRating" htmlFor="rating" className={classNames({ 'p-error': isFormFieldValid('rating') })}></label>
                            {getFormErrorMessage('rating')}
                    </div>
                    <div id="deliveryTimeDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="deliveryTimeHeader"> Tahmini Teslim Süresi (dakika)</h4>
                        <InputNumber  id="delivery_time " name="delivery_time"  value={formik.values.delivery_time} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                        <label id="errorDeliveryTime" htmlFor="delivery_time" className={classNames({ 'p-error': isFormFieldValid('delivery_time') })}></label>
                            {getFormErrorMessage('delivery_time')}
                    </div>
                    <div id="addressDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="addresHeader">Açık Adres</h4>
                        <InputText  id="address " name="address"  value={formik.values.address} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('address') })}/>
                        <label id="errorAddress" htmlFor="address" className={classNames({ 'p-error': isFormFieldValid('address') })}></label>
                            {getFormErrorMessage('address')}
                    </div>
                    <div id="postalCodeDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="postalCodeHeader">Posta kodu</h4>
                        <InputText  id="postal_code " name="postal_code"  value={formik.values.postal_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('postal_code') })}/>
                        <label id="errorPostalCode" htmlFor="postal_code" className={classNames({ 'p-error': isFormFieldValid('postal_code') })}></label>
                            {getFormErrorMessage('postal_code')}
                    </div>
                    <div id="latDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="latHeader">Enlem</h4>
                        <InputNumber  id="latitudeInt " name="latitudeInt"  value={formik.values.latitudeInt} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('latitudeInt') })}/>
                        <label id="errorLat" htmlFor="latitudeInt" className={classNames({ 'p-error': isFormFieldValid('latitudeInt') })}></label>
                            {getFormErrorMessage('latitudeInt')}
                    </div>
                    <div id="longDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="longHeader">Boylam</h4>
                        <InputNumber id="longtitudeInt " name="longtitudeInt"  value={formik.values.longtitudeInt} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('longtitudeInt') })}/>
                        <label id="errorLong" htmlFor="longtitudeInt" className={classNames({ 'p-error': isFormFieldValid('longtitudeInt') })}></label>
                            {getFormErrorMessage('longtitudeInt')}
                    </div>
                    <div id="commissionRateDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="commissionRateHeader">Komisyon Oranı %</h4>
                        <InputNumber  id="commission_rate " name="commission_rate"   value={formik.values.commission_rate} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('commission_rate') })}/>
                        <label id="errorCommissionRate" htmlFor="commission_rate" className={classNames({ 'p-error': isFormFieldValid('commission_rate') })}></label>
                            {getFormErrorMessage('commission_rate')}
                    </div>
                    <div id="licenseCodeDiv" className="p-field p-col-12 p-md-4">
                        <h4 id="licenseCodeHeader">Lisans Kodu</h4>
                        <InputText  id="license_code " name="license_code"  value={formik.values.license_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('license_code') })}/>
                        <label id="errorLicenseCode" htmlFor="license_code" className={classNames({ 'p-error': isFormFieldValid('license_code') })}></label>
                            {getFormErrorMessage('license_code')}
                    </div>
                    <div id="chargesDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="chargesHeader">Restoran Ücreti</h4>
                        <InputNumber  id="restaurant_charges " name="restaurant_charges"  value={formik.values.charges} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('restaurant_charges') })}/>
                        <label id="errorCharges" htmlFor="restaurant_charges" className={classNames({ 'p-error': isFormFieldValid('restaurant_charges') })}></label>
                            {getFormErrorMessage('restaurant_charges')}
                    </div>
                    <div id="deliveryRadiusDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="deliveryRadiusHeader">Teslimat Yarıçapı (km)</h4>
                        <InputNumber  id="delivery_radius " name="delivery_radius"  value={formik.values.delivery_radius} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('delivery_radius') })}/>
                        <label id="errorDeliveryRadius" htmlFor="delivery_radius" className={classNames({ 'p-error': isFormFieldValid('delivery_radius') })}></label>
                            {getFormErrorMessage('delivery_radius')}
                    </div>
                    <div id="minimumOrderDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="minimumOrderHeader">Minimum amount</h4>
                        <InputNumber  id="minimum_order_amount " name="minimum_order_amount"  value={formik.values.minimum_order_amount} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('minimum_order_amount') })}/>
                        <label id="errorMinimumOrder" htmlFor="minimum_order_amount" className={classNames({ 'p-error': isFormFieldValid('minimum_order_amount') })}></label>
                            {getFormErrorMessage('minimum_order_amount')}
                    </div>
                <div className="p-fluid">
            </div>
            <div id="switchDiv" className="p-field p-col-12 p-md-3">
                <h4 id="vegiHeader">Saf Sebze Mi</h4>
                <InputSwitch  id="is_vegi " name="is_vegi"  checked={formik.values.is_vegi} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('is_vegi') })}/>
                <label id="errorVegi" htmlFor="is_vegi" className={classNames({ 'p-error': isFormFieldValid('is_vegi') })}></label>
                            {getFormErrorMessage('is_vegi')}
                <h4 id="featuredHeader">Öne Çıkma</h4>
                <InputSwitch  id="featured " name="featured"  checked={formik.values.featured} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('featured') })}/>
                <label id="errorFeatured" htmlFor="featured" className={classNames({ 'p-error': isFormFieldValid('featured') })}></label>
                            {getFormErrorMessage('featured')}
                <h4 id="activeHeader">Aktif?</h4>
                <InputSwitch  id="active " name="active"  checked={formik.values.active} onChange={formik.handleChange}
                 className={classNames({ 'p-invalid': isFormFieldValid('active') })}/>
                <label id="errorActive" htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                            {getFormErrorMessage('active')}
            </div>

            <S.SubmitBtn id="btnContainer">

                <Button id="editBtn" type="submit" label="Gönder"/>
            </S.SubmitBtn>
            </form>
            </S.ContainerCard>
            </TabPanel>
            <TabPanel header="Restoran Yemekleri">
                <FoodsTable foods={foods} resid={router.query.id} />
        </TabPanel>
        </TabView>
        </div>
    )
}

 export default  (UpdateRestaurants);
