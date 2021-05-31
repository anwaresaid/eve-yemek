import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
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


    const UpdateRestaurants = () => {
// settign variables
    const [totalSize, setTotalSize] = useState(0);
    const [files, setFile] = useState(null);
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

//image upload functions
    const onTemplateSelect = (e:any) => {
        let _totalSize = totalSize;
        // e.files.map(file => {
        //     _totalSize += file.size;
        // });
        for(let i = 0 ; i<e.files.length;i++){
            _totalSize += e.files[i].size;
        }
        setTotalSize(_totalSize);

    }


    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        formik.values.file = e.files[0];
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/20000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 2 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                 <i className="pi pi-image p-mt-3 p-p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="p-my-5">Drag and Drop Image Here</span>
            </div>
        )
    }
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};
    return (
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
            <TabView>
                <TabPanel header="Restoran Duzenle">
            <S.ContainerCard>
                 <form onSubmit = {formik.handleSubmit} >

                    <div className="p-fluid">
                        <div className="p-field p-col-12">
                            <h4>Ad</h4>
                            <InputText id="name " name="name" value={formik.values.name} onChange={formik.handleChange} type="text" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field p-col-12">
                            <h4>Açıklama</h4>
                            <InputText id="description" name="description" value={formik.values.description} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })} onChange={formik.handleChange} type="text"/>
                            <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                        <div className="p-field p-col-12">
                            <h4>Restoran Sahibi </h4>
                            <Dropdown  id="owner " name="owner"  value={formik.values.owner} options={resOwnersName} onChange={formik.handleChange} optionLabel="name" placeholder="Select an Owner" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('owner') })} />
                            <label htmlFor="owner" className={classNames({ 'p-error': isFormFieldValid('owner') })}></label>
                            {getFormErrorMessage('owner')}
                        </div>
                    </div>
                    <div className="p-field p-col-12">
                        <FileUpload ref={fileUploadRef} name="image" url="./" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
                            uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                <label htmlFor="file" className={classNames({ 'p-error': isFormFieldValid('file') })}></label>
                            {getFormErrorMessage('file')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Telefon</h4>
                        <InputMask  id="phone " name="phone"  mask="(999) 999-9999" value={formik.values.phone} placeholder="(999) 999-9999" onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid('phone') })}></InputMask>
                        <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid('phone') })}></label>
                            {getFormErrorMessage('phone')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Email</h4>
                        <InputText  id="email " name="email"  value={formik.values.email} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}></label>
                            {getFormErrorMessage('email')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Şehir</h4>
                        <Dropdown  id="city " name="city"  value={formik.values.city} options={cities} onChange={formik.handleChange} optionLabel="name" placeholder="Şehir" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('city') })} />
                        <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid('city') })}></label>
                            {getFormErrorMessage('city')}
                        <h4>İlçe</h4>
                        <Dropdown  id="town " name="town"  value={formik.values.town} options={counties} onChange={formik.handleChange} optionLabel="name" placeholder="İlçe"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('town') })}/>
                        <label htmlFor="town" className={classNames({ 'p-error': isFormFieldValid('town') })}></label>
                            {getFormErrorMessage('town')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Derece</h4>
                        <InputNumber  id="rating " name="rating"  value={formik.values.rating} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('rating') })}/>
                        <label htmlFor="rating" className={classNames({ 'p-error': isFormFieldValid('rating') })}></label>
                            {getFormErrorMessage('rating')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4> Tahmini Teslim Süresi (dakika)</h4>
                        <InputNumber  id="delivery_time " name="delivery_time"  value={formik.values.delivery_time} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                        <label htmlFor="delivery_time" className={classNames({ 'p-error': isFormFieldValid('delivery_time') })}></label>
                            {getFormErrorMessage('delivery_time')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Açık Adres</h4>
                        <InputText  id="address " name="address"  value={formik.values.address} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('address') })}/>
                        <label htmlFor="address" className={classNames({ 'p-error': isFormFieldValid('address') })}></label>
                            {getFormErrorMessage('address')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Posta kodu</h4>
                        <InputText  id="postal_code " name="postal_code"  value={formik.values.postal_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('postal_code') })}/>
                        <label htmlFor="postal_code" className={classNames({ 'p-error': isFormFieldValid('postal_code') })}></label>
                            {getFormErrorMessage('postal_code')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Enlem</h4>
                        <InputNumber  id="latitudeInt " name="latitudeInt"  value={formik.values.latitudeInt} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('latitudeInt') })}/>
                        <label htmlFor="latitudeInt" className={classNames({ 'p-error': isFormFieldValid('latitudeInt') })}></label>
                            {getFormErrorMessage('latitudeInt')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Boylam</h4>
                        <InputNumber id="longtitudeInt " name="longtitudeInt"  value={formik.values.longtitudeInt} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('longtitudeInt') })}/>
                        <label htmlFor="longtitudeInt" className={classNames({ 'p-error': isFormFieldValid('longtitudeInt') })}></label>
                            {getFormErrorMessage('longtitudeInt')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Komisyon Oranı %</h4>
                        <InputNumber  id="commission_rate " name="commission_rate"   value={formik.values.commission_rate} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('commission_rate') })}/>
                        <label htmlFor="commission_rate" className={classNames({ 'p-error': isFormFieldValid('commission_rate') })}></label>
                            {getFormErrorMessage('commission_rate')}
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Lisans Kodu</h4>
                        <InputText  id="license_code " name="license_code"  value={formik.values.license_code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('license_code') })}/>
                        <label htmlFor="license_code" className={classNames({ 'p-error': isFormFieldValid('license_code') })}></label>
                            {getFormErrorMessage('license_code')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Restoran Ücreti</h4>
                        <InputNumber  id="restaurant_charges " name="restaurant_charges"  value={formik.values.charges} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('restaurant_charges') })}/>
                        <label htmlFor="restaurant_charges" className={classNames({ 'p-error': isFormFieldValid('restaurant_charges') })}></label>
                            {getFormErrorMessage('restaurant_charges')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Teslimat Yarıçapı (km)</h4>
                        <InputNumber  id="delivery_radius " name="delivery_radius"  value={formik.values.delivery_radius} onValueChange={formik.handleChange} showButtons autoFocus className={classNames({ 'p-invalid': isFormFieldValid('delivery_radius') })}/>
                        <label htmlFor="delivery_radius" className={classNames({ 'p-error': isFormFieldValid('delivery_radius') })}></label>
                            {getFormErrorMessage('delivery_radius')}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
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
