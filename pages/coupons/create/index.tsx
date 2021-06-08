import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import {createCoupons} from '../../../store/actions/coupons.action';
import {listRestaurant} from '../../../store/actions/restaurant.action';
import {useDispatch,useSelector} from 'react-redux';
import { Calendar } from 'primereact/calendar';
import {RootState} from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames'



export const Index = () => {

    const toast = useRef(null);
    const [restaurantName, setRestaurantName] = useState(null);
    const dispatch = useDispatch();

//use selectors for setting dispatch to variable.

    const resRestaurants = useSelector((state:RootState) => state.listRestaurant);
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants } = resRestaurants;

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const discount_types = [
        {title:'Fixed', value:'FIXED'},
        {title:'Percentage', value:'PERCENTAGE'}
    ]

    const formik = useFormik({
        initialValues:{
            resName: '',
            name: '',
            description: '',
            coupon_code: '',
            restaurant_id:'',
            expire_date:'',
            discount: 0,
            discount_type:'',
            max_usage:0,
            active: false
        },
        validate: (data)=>{
            let errors:any = {}

            if (!data.resName) {
                errors.resName = 'restaurant is required.';
            }else{
                let selectedRestaurants = restaurants.items.filter(data  => {return data.name.localeCompare(formik.values.resName.name)==0;});
                if(selectedRestaurants!=null)
                    formik.values.restaurant_id = selectedRestaurants[0]?._id;

            }

            if (!data.name) {
                errors.name = 'name is required.';
            }
            if (!data.description) {
                errors.description = 'description is required.';
            }
            if (!data.expire_date) {
                errors.expire_date = 'expire date is required.';
            }

            if (!data.discount_type) {
                errors.discount_type = 'discount_type is required.';
            }
            if (!data.max_usage) {
                errors.max_usage = 'max usage is required.';
            }
            console.log("errors",errors);
            return errors;
        },
        onSubmit: (data:any) => {
            // setFormData(data);
            // setShowMessage(true);
            dispatch(createCoupons(data));

        }
    });
//setting names for dropdowns.
    const settingDropDownNames= () => {
    
        const restaurantNames =  restaurants.items.map(res => {return{name: res.name}});
        setRestaurantName(restaurantNames);
       }


    useEffect(() =>{


        if(!restaurantsSuccess)
            dispatch(listRestaurant());

        if(restaurantsSuccess)
                settingDropDownNames();
    }, [restaurantsSuccess]);
    console.log(formik.values);
    return (
        <div id="create_coupons">
            <h1 id="createHeader">Oluştur</h1>
            <Toast id="toastMessage" ref={toast}></Toast>
            <S.ContainerCard id="container">
                 <form id="createForm" onSubmit={formik.handleSubmit}  >
                    <div className="p-fluid">
                        <div id="nameDiv" className="p-field">
                            <h4 id="nameHeader">Kupon Adı</h4>
                            <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label id="errorName" htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div id="descriptionDiv"className="p-field">
                            <h4 id="descriptionHeader">Kupon Açıklaması</h4>
                            <InputText id="description" name="description" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                            <label id="description" htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                        <div id="restaurantDiv" className="p-field">
                            <h4 id="restaurantHeader">Restauran</h4>
                            <Dropdown id="resName" name="resName" value={formik.values.resName} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('resName') })} />
                            <label id="errorDescription" htmlFor="resName" className={classNames({ 'p-error': isFormFieldValid('resName') })}></label>
                            {getFormErrorMessage('resName')}
                        </div>
                        <div id="codeDiv" className="p-field">
                            <h4 id="codeHeader">Kupon Kodu </h4>
                            <InputText id="coupon_code" name="coupon_code" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('coupon_code') })}/>
                            <label id="errorCode" htmlFor="coupon_code" className={classNames({ 'p-error': isFormFieldValid('coupon_code') })}></label>
                            {getFormErrorMessage('coupon_code')}
                        </div>
                    </div>
                    <div className="p-fluid">
                        <div id="discountTypeDiv" className="card">
                            <h4 id="discountTypeHeader">İndirim Türü </h4>
                            <Dropdown id="discount_type" name="discount_type" value={formik.values.discount_type}
                             options={discount_types} onChange={formik.handleChange} optionLabel="title"
                              placeholder="İndirim Türü" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('discount_type') })}/>
                            <label id="errorDiscountType" htmlFor="discount_type" className={classNames({ 'p-error': isFormFieldValid('discount_type') })}></label>
                                        {getFormErrorMessage('discount_type')}
                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                    <div id="expirationDiv" className="p-field p-col-12 p-md-3">
                        <h4 id="expirationHeader">Son Kullanma Tarihi</h4>
                        <Calendar id="expire_date" name="expire_date" value={formik.values.date} onChange={formik.handleChange} />
                    </div>
                        <div id="discountDiv" className="p-field p-col-12 p-md-3">
                            <h4 id="discountHeader"> İndirim </h4>
                            <InputNumber id="discount" name="discount" value={formik.values.discount} onValueChange={formik.handleChange} showButtons/>
                        </div>
                        <div id="max_usage_Div" className="p-field p-col-12 p-md-3">
                            <h4 id="max_usage_Header"> Maksimum Kullanım</h4>
                            <InputNumber id="max_usage" name="max_usage" value={formik.values.max_usage} onValueChange={formik.handleChange} showButtons/>
                        </div>
                    </div>
                    <div id="activeDiv">
                        <h4 id="activeHeader">Aktif</h4>
                        <InputSwitch checked={formik.values.active} name="active" id="active" onChange={formik.handleChange} />
                    </div>
                    <S.SubmitBtn id="createContainer">
                        <Button id="createBtn" type="submit" label="Create"/>
                    </S.SubmitBtn>
                </form>
            </S.ContainerCard>
    </div>
    )
}

 export default  (Index);
