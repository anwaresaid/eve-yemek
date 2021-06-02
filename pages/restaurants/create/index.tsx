import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import * as S from '../../../styles/restaurants/restaurants.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import {createRestaurant} from '../../../store/actions/restaurant.action';
import {listRestaurantOwners} from '../../../store/actions/restaurant.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { InputMask } from 'primereact/inputmask';
import { useFormik } from 'formik';
import { restaurantsTypes } from "../../../store/types/restaurants.type";
import classNames from 'classnames'
import { useRouter } from 'next/router';
import StandardFileUpload from '../../../components/inputs/fileUpload';
import InputContainer from '../../../components/inputs/inputContainer';
import { i18n } from '../../../language';


    const CreateRestaurants = () => {
// settign variables
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const [resOwnersName, setResOwnersName] = useState([" "]);
    const restaurantCreate = useSelector((state:RootState) => state.createRestaurant);
  const { success } = restaurantCreate;

    const dispatch = useDispatch();
    const router = useRouter();

//use selectors for setting dispatch to variable.
    const resOwnersList = useSelector((state:RootState) => state.listRestaurantOwners);

    const { loading, success:resOnwersSuccess, restaurantOwners: resOwnerslist } = resOwnersList;

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
                errors.owner_id = i18n.t('isRequired', {input: i18n.t('restaurantOwner')});
            }

            if (!data.name) {
                errors.name = i18n.t('isRequired', {input: i18n.t('restaurantName')});
            }
            if (!data.description) {
                errors.description = i18n.t('isRequired', {input: i18n.t('description')});
            }
            if (!data.file) {
                errors.file = i18n.t('isRequired', {input: i18n.t('image')});
            }

            if (!data.phone) {
                errors.phone = i18n.t('isRequired', {input: i18n.t('phoneNumber')});
            }

            if (!data.email) {
                errors.email = i18n.t('isRequired', {input: i18n.t('email')});
            }

            if (!data.rating) {
                errors.rating = i18n.t('isRequired', {input: i18n.t('rating')});
            }

            if (!data.delivery_time) {
                errors.delivery_time = i18n.t('isRequired', {input: i18n.t('approximateDeliveryTime')});
            }

            if (!data.commission_rate) {
                errors.commission_rate = i18n.t('isRequired', {input: i18n.t('commissionRate')});
            }

            if (!data.license_code) {
                errors.license_code = i18n.t('isRequired', {input: i18n.t('licenseCode')});
            }

            if (!data.restaurant_charges) {
                errors.restaurant_charges = i18n.t('isRequired', {input: i18n.t('restaurantFee')});
            }

            if (!data.delivery_radius) {
                errors.delivery_radius = i18n.t('isRequired', {input: i18n.t('deliveryRadius')});
            }

            if (!data.owner) {
                errors.owner = i18n.t('isRequired', {input: i18n.t('ownerName')});
            }
            else
            {
                let selectedResOwners = resOwnerslist.items.filter(data  => {return data.name.localeCompare(formik.values.owner?.name)==0;});
                formik.values.owner_id = selectedResOwners[0]?._id;
                formik.values.owner_name = formik.values.owner?.name;
            }

            if (!data.city) {
                errors.city = i18n.t('isRequired', {input: i18n.t('city')});
            }
            else
            {
                formik.values.city_id = data.city.name;
            }

            if (!data.town) {
                errors.town = i18n.t('isRequired', {input: i18n.t('district')});
            }
            else
            {
                formik.values.town_id = data.town.name;
            }

            if (!data.minimum_order_amount) {
                errors.minimum_order_amount = i18n.t('isRequired', {input: i18n.t('minimumAmount')});
            }

            if (!data.latitudeInt) {
                errors.latitudeInt = i18n.t('isRequired', {input: i18n.t('latitude')});
            }
            else
            {
                formik.values.latitude = formik.values.latitudeInt?.toString();
            }
            if (!data.longtitudeInt) {
                errors.longtitudeInt = i18n.t('isRequired', {input: i18n.t('longitude')});
            }
            else
            {
                formik.values.longtitude = formik.values.longtitudeInt?.toString();
            }
            return errors;
        },
        onSubmit: (data:any) => {
            // setFormData(data);
            // setShowMessage(true);
            dispatch(createRestaurant(data));

        }
    });


    useEffect(() =>{
        if(!resOnwersSuccess)
            dispatch(listRestaurantOwners());
        if(resOnwersSuccess)
        {
            settingDropDownNames();
        }
        if(success){
            router.push('/restaurants');
            dispatch({type: restaurantsTypes.RESTAURAT_CREATE_RESET});
        }


    }, [resOnwersSuccess,success]);

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


//image upload functions
    return (
        <div>
            <h1>{i18n.t('createRestaurant')}</h1>
            <Toast ref={toast}></Toast>
             <S.ContainerCard>
                 <form onSubmit = {formik.handleSubmit} >

                    <div className="p-fluid">
                        <div className="p-field p-col-12">
                            <h4>{i18n.t('name')}</h4>
                            <InputText id="name " name="name" onChange={formik.handleChange} type="text" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field p-col-12">
                            <h4>{i18n.t('description')}</h4>
                            <InputText id="description" name="description" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })} onChange={formik.handleChange} type="text"/>
                            <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                        <div className="p-field p-col-12">
                            <h4>{i18n.t('restaurantOwner')}</h4>
                            <Dropdown  id="owner " name="owner"  value={formik.values.owner} options={resOwnersName} onChange={formik.handleChange} optionLabel="name" placeholder="Select an Owner" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('owner') })} />
                            <label htmlFor="owner" className={classNames({ 'p-error': isFormFieldValid('owner') })}></label>
                            {getFormErrorMessage('owner')}
                        </div>
                    </div>
                    <div className="p-field p-col-12">
                        <InputContainer name="file" label={i18n.t('images')} getFormErrorMessage={getFormErrorMessage} isFormFieldValid={isFormFieldValid}>
                                <StandardFileUpload 
                                        totalSize={totalSize} 
                                        setTotalSize={setTotalSize} 
                                        setFile={(file)=>{formik.values.file=file}}
                                        showSuccess={()=>{toast.current.show({severity: 'info', summary: i18n.t('success') , detail: i18n.t('File Uploaded')});}}
                                        >   
                                </StandardFileUpload>
                        </InputContainer>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('telephone')}</h4>
                        <InputMask  id="phone " name="phone"  mask="(999) 999-9999" value={formik.values.phone} placeholder="(999) 999-9999" onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid('phone') })}></InputMask>
                        <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid('phone') })}></label>
                            {getFormErrorMessage('phone')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('email')}</h4>
                        <InputText  id="email " name="email"  value={formik.values.email} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}></label>
                            {getFormErrorMessage('email')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('city')}</h4>
                        <Dropdown  id="city " name="city"  value={formik.values.city} options={cities} onChange={formik.handleChange} optionLabel="name" placeholder="Şehir" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('city') })} />
                        <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid('city') })}></label>
                            {getFormErrorMessage('city')}
                        <h4>{i18n.t('district')}</h4>
                        <Dropdown  id="town " name="town"  value={formik.values.town} options={counties} onChange={formik.handleChange} optionLabel="name" placeholder="İlçe"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('town') })}/>
                        <label htmlFor="town" className={classNames({ 'p-error': isFormFieldValid('town') })}></label>
                            {getFormErrorMessage('town')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('rating')}</h4>
                        <InputNumber  id="rating " name="rating"  value={formik.values.rating} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('rating') })}/>
                        <label htmlFor="rating" className={classNames({ 'p-error': isFormFieldValid('rating') })}></label>
                            {getFormErrorMessage('rating')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('approximateDeliveryTime')}</h4>
                        <InputNumber  id="delivery_time " name="delivery_time"  value={formik.values.delivery_time} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                        <label htmlFor="delivery_time" className={classNames({ 'p-error': isFormFieldValid('delivery_time') })}></label>
                            {getFormErrorMessage('delivery_time')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('fullAddress')}</h4>
                        <InputText  id="address " name="address"  value={formik.values.address} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('address') })}/>
                        <label htmlFor="address" className={classNames({ 'p-error': isFormFieldValid('address') })}></label>
                            {getFormErrorMessage('address')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('postalCode')}</h4>
                        <InputText  id="postal_code " name="postal_code"  value={formik.values.postal_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('postal_code') })}/>
                        <label htmlFor="postal_code" className={classNames({ 'p-error': isFormFieldValid('postal_code') })}></label>
                            {getFormErrorMessage('postal_code')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('latitude')}</h4>
                        <InputNumber  id="latitudeInt " name="latitudeInt"  value={formik.values.latitudeIntStr} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('latitudeInt') })}/>
                        <label htmlFor="latitudeInt" className={classNames({ 'p-error': isFormFieldValid('latitudeInt') })}></label>
                            {getFormErrorMessage('latitudeInt')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('longitude')}</h4>
                        <InputNumber id="longtitudeInt " name="longtitudeInt"  value={formik.values.longtitudeInt} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('longtitudeInt') })}/>
                        <label htmlFor="longtitudeInt" className={classNames({ 'p-error': isFormFieldValid('longtitudeInt') })}></label>
                            {getFormErrorMessage('longtitudeInt')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('commissionRate')}</h4>
                        <InputNumber  id="commission_rate " name="commission_rate"   value={formik.values.commission_rate} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('commission_rate') })}/>
                        <label htmlFor="commission_rate" className={classNames({ 'p-error': isFormFieldValid('commission_rate') })}></label>
                            {getFormErrorMessage('commission_rate')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>{i18n.t('licenseCode')}</h4>
                        <InputText  id="license_code " name="license_code"  value={formik.values.license_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('license_code') })}/>
                        <label htmlFor="license_code" className={classNames({ 'p-error': isFormFieldValid('license_code') })}></label>
                            {getFormErrorMessage('license_code')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('restaurantFee')}</h4>
                        <InputNumber  id="restaurant_charges " name="restaurant_charges"  value={formik.values.charges} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('restaurant_charges') })}/>
                        <label htmlFor="restaurant_charges" className={classNames({ 'p-error': isFormFieldValid('restaurant_charges') })}></label>
                            {getFormErrorMessage('restaurant_charges')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('deliveryRadius')}</h4>
                        <InputNumber  id="delivery_radius " name="delivery_radius"  value={formik.values.delivery_radius} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('delivery_radius') })}/>
                        <label htmlFor="delivery_radius" className={classNames({ 'p-error': isFormFieldValid('delivery_radius') })}></label>
                            {getFormErrorMessage('delivery_radius')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>{i18n.t('minimumAmount')}</h4>
                        <InputNumber  id="minimum_order_amount " name="minimum_order_amount"  value={formik.values.minimum_order_amount} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('minimum_order_amount') })}/>
                        <label htmlFor="minimum_order_amount" className={classNames({ 'p-error': isFormFieldValid('minimum_order_amount') })}></label>
                            {getFormErrorMessage('minimum_order_amount')}
                    </div>
                <div className="p-fluid">
            </div>
            <div className="p-field p-col-12 p-md-3">
                <h4>{i18n.t('vegetablesOnly')}</h4>
                <InputSwitch  id="is_vegi " name="is_vegi"  checked={formik.values.is_vegi} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('is_vegi') })}/>
                <label htmlFor="is_vegi" className={classNames({ 'p-error': isFormFieldValid('is_vegi') })}></label>
                            {getFormErrorMessage('is_vegi')}
                <h4>{i18n.t('prioritized')}</h4>
                <InputSwitch  id="featured " name="featured"  checked={formik.values.featured} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('featured') })}/>
                <label htmlFor="featured" className={classNames({ 'p-error': isFormFieldValid('featured') })}></label>
                            {getFormErrorMessage('featured')}
                <h4>{i18n.t('open')}</h4>
                <InputSwitch  id="active " name="active"  checked={formik.values.active} onChange={formik.handleChange}
                 className={classNames({ 'p-invalid': isFormFieldValid('active') })}/>
                <label htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                            {getFormErrorMessage('active')}
            </div>

            <S.SubmitBtn>

                <Button type="submit" label="Create"/>
            </S.SubmitBtn>
            </form>
            </S.ContainerCard>
        </div>
    )
}

 export default  (CreateRestaurants);
