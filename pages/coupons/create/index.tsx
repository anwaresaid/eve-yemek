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
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
            <S.ContainerCard>
                 <form onSubmit={formik.handleSubmit}  >
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>Kupon Adı</h4>
                            <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field">
                            <h4>Kupon Açıklaması</h4>
                            <InputText id="description" name="description" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                            <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                        <div className="p-field">
                            <h4>Restauran</h4>
                            <Dropdown id="resName" name="resName" value={formik.values.resName} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('resName') })} />
                            <label htmlFor="resName" className={classNames({ 'p-error': isFormFieldValid('resName') })}></label>
                            {getFormErrorMessage('resName')}
                        </div>
                        <div className="p-field">
                            <h4>Kupon Kodu </h4>
                            <InputText id="coupon_code" name="coupon_code" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('coupon_code') })}/>
                            <label htmlFor="coupon_code" className={classNames({ 'p-error': isFormFieldValid('coupon_code') })}></label>
                            {getFormErrorMessage('coupon_code')}
                        </div>
                    </div>
                    <div className="p-fluid">
                        <div className="card">
                            <h4>İndirim Türü </h4>
                            <Dropdown id="discount_type" name="discount_type" value={formik.values.discount_type}
                             options={discount_types} onChange={formik.handleChange} optionLabel="title"
                              placeholder="İndirim Türü" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('discount_type') })}/>
                            <label htmlFor="discount_type" className={classNames({ 'p-error': isFormFieldValid('discount_type') })}></label>
                                        {getFormErrorMessage('discount_type')}
                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Son Kullanma Tarihi</h4>
                        <Calendar id="expire_date" name="expire_date" value={formik.values.date} onChange={formik.handleChange} />
                    </div>
                        <div className="p-field p-col-12 p-md-3">
                            <h4> İndirim </h4>
                            <InputNumber id="discount" name="discount" value={formik.values.discount} onValueChange={formik.handleChange} showButtons/>
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <h4> Maksimum Kullanım</h4>
                            <InputNumber id="max_usage" name="max_usage" value={formik.values.max_usage} onValueChange={formik.handleChange} showButtons/>
                        </div>
                    </div>
                    <div>
                        <h4>Aktif</h4>
                        <InputSwitch checked={formik.values.active} name="active" id="active" onChange={formik.handleChange} />
                    </div>
                    <S.SubmitBtn>
                        <Button type="submit" label="Submit"/>
                    </S.SubmitBtn>
                </form>
            </S.ContainerCard>
    </div>
    )
}

 export default  (Index);