import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/restaurants/restaurants.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { updateRestaurant } from '../../store/actions/restaurant.action';
import { listRestaurantOwners } from '../../store/actions/restaurant.action';
import { findRestaurant } from '../../store/actions/restaurant.action';
import { useDispatch,useSelector } from 'react-redux';
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
import { Card } from 'primereact/card';
import FormColumn from '../../components/inputs/formColumn';
import InputGroup from '../../components/inputs/inputGroup';


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
            rating : 0,
            delivery_time : 0,
            commission_rate : 0,
            license_code : '',
            file:'',
            restaurant_charges : 0,
            delivery_radius : 0,
            is_veg : false,
            featured : false,
            active : false,
            owner : '',
            owner_name : '',
            city : 0,
            town : 0,
            is_agreement : false,
            minimum_order_amount:0,
            latitudeInt: 0,
            longtitudeInt: 0,
            city_id:0,
            town_id:0,
            longtitude: 0,
            latitude: 0,
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

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }

    return (
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
            <TabView>
                <TabPanel header="Restoran Düzenle">
            <S.ContainerCard>
                 <form onSubmit = {formik.handleSubmit} >
                    <div className="p-grid">
                        <FormColumn>
                            <h2>Genel Bilgiler</h2>

                            <InputGroup>
                                <InputContainer label="Ad" name="name" formiks={inputFormiks} component={InputText} iprops={{
                                    value:formik.values.name,
                                    onChange:formik.handleChange,
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Restoran Sahibi" name="owner" formiks={inputFormiks} component={Dropdown} iprops={{
                                    value:formik.values.owner,
                                    onChange:formik.handleChange,
                                    options:resOwnersName,
                                    placeholder:"Select an Owner",
                                    optionLabel:"name"
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Telefon" name="phone" formiks={inputFormiks} size={6} component={InputMask} iprops={{
                                    value:formik.values.phone,
                                    mask:"(999) 999-9999",
                                    placeholder:"(999) 999-9999",
                                    onChange:formik.handleChange,
                                }}/>

                                <InputContainer label="Email" name="email" formiks={inputFormiks} size={6} component={InputText} iprops={{
                                    value:formik.values.email,
                                    onChange:formik.handleChange,
                                }}/>

                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Açıklama" name="description" formiks={inputFormiks} component={InputTextarea} iprops={{
                                    value:formik.values.description,
                                    onChange:formik.handleChange,
                                    rows:3,
                                    autoResize:true
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Resim" name="rating" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                                    setFile:(image)=>{ formik.values.image=image },
                                    showSuccess:()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}
                                }}/>
                            </InputGroup>
                        </FormColumn>  
                        <FormColumn>
                            <h2>Adres bilgileri</h2>

                            <InputGroup>
                                <InputContainer label="Şehir" name="city" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                    value:formik.values.city,
                                    onChange:formik.handleChange,
                                    options:cities,
                                    placeholder:"Şehir",
                                    optionLabel:"name"
                                }}/>

                                <InputContainer label="İlçe" name="town" formiks={inputFormiks} size={6} component={Dropdown} iprops={{
                                    value:formik.values.town,
                                    onChange:formik.handleChange,
                                    options:counties,
                                    placeholder:"İlçe",
                                    optionLabel:"name"
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Posta kodu" name="postal_code" formiks={inputFormiks} component={InputText} iprops={{
                                        value:formik.values.postal_code,
                                        onChange:formik.handleChange,
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Enlem" name="latitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value:formik.values.latitudeInt,
                                    onValueChange:formik.handleChange,
                                    showButtons:true,
                                }}/>
                                
                                <InputContainer label="Boylam" name="longtitudeInt" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                                    value:formik.values.longtitudeInt,
                                    onValueChange:formik.handleChange,
                                    showButtons:true,
                                }}/>
                            </InputGroup>

                            <InputGroup>
                                <InputContainer label="Açık Adres" name="address" formiks={inputFormiks} component={InputTextarea} iprops={{
                                    value:formik.values.address,
                                    onChange:formik.handleChange,
                                    rows:3,
                                    autoResize:true
                                }}/>
                            </InputGroup>
                        </FormColumn>
                    </div>
                    

                    

                    <div className="p-fluid p-grid">
                        <InputContainer label="Derece" name="rating" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                            value:formik.values.rating,
                            onValueChange:formik.handleChange,
                            showButtons:true,
                        }}/>
                        
                        <InputContainer label="Tahmini Teslim Süresi (dakika)" name="delivery_time" formiks={inputFormiks} size={6} component={InputNumber} iprops={{
                            value:formik.values.delivery_time,
                            onValueChange:formik.handleChange,
                            showButtons:true,
                        }}/>
                    </div>


                    <div className="p-field p-col-12 p-md-6">
                        <h4>Komisyon Oranı %</h4>
                        <InputNumber  id="commission_rate " name="commission_rate"   value={formik.values.commission_rate} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('commission_rate') })}/>
                        <label htmlFor="commission_rate" className={classNames({ 'p-error': isFormFieldValid('commission_rate') })}></label>
                            {getFormErrorMessage('commission_rate')}
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <h4>Lisans Kodu</h4>
                        <InputText  id="license_code " name="license_code"  value={formik.values.license_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('license_code') })}/>
                        <label htmlFor="license_code" className={classNames({ 'p-error': isFormFieldValid('license_code') })}></label>
                            {getFormErrorMessage('license_code')}
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <h4>Restoran Ücreti</h4>
                        <InputNumber  id="restaurant_charges " name="restaurant_charges"  value={formik.values.charges} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('restaurant_charges') })}/>
                        <label htmlFor="restaurant_charges" className={classNames({ 'p-error': isFormFieldValid('restaurant_charges') })}></label>
                            {getFormErrorMessage('restaurant_charges')}
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <h4>Teslimat Yarıçapı (km)</h4>
                        <InputNumber  id="delivery_radius " name="delivery_radius"  value={formik.values.delivery_radius} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('delivery_radius') })}/>
                        <label htmlFor="delivery_radius" className={classNames({ 'p-error': isFormFieldValid('delivery_radius') })}></label>
                            {getFormErrorMessage('delivery_radius')}
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <h4>Minimum amount</h4>
                        <InputNumber  id="minimum_order_amount " name="minimum_order_amount"  value={formik.values.minimum_order_amount} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('minimum_order_amount') })}/>
                        <label htmlFor="minimum_order_amount" className={classNames({ 'p-error': isFormFieldValid('minimum_order_amount') })}></label>
                            {getFormErrorMessage('minimum_order_amount')}
                    </div>
                <div className="p-fluid">
            </div>
            <div className="p-field p-col-12 p-md-3">
                <h4>Saf Sebze Mi</h4>
                <InputSwitch  id="is_vegi " name="is_vegi"  checked={formik.values.is_vegi} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('is_vegi') })}/>
                <label htmlFor="is_vegi" className={classNames({ 'p-error': isFormFieldValid('is_vegi') })}></label>
                            {getFormErrorMessage('is_vegi')}
                <h4>Öne Çıkma</h4>
                <InputSwitch  id="featured " name="featured"  checked={formik.values.featured} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('featured') })}/>
                <label htmlFor="featured" className={classNames({ 'p-error': isFormFieldValid('featured') })}></label>
                            {getFormErrorMessage('featured')}
                <h4>Açık?</h4>
                <InputSwitch  id="active " name="active"  checked={formik.values.active} onChange={formik.handleChange}
                 className={classNames({ 'p-invalid': isFormFieldValid('active') })}/>
                <label htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                            {getFormErrorMessage('active')}
            </div>

            <S.SubmitBtn>

                <Button type="submit" label="Gönder"/>
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
