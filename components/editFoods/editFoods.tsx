
import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import {Route, useHistory } from 'react-router-dom';
import { updateFood } from '../../store/actions/foods.action';
import {useDispatch,useSelector} from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import {useRouter} from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames'
import { foodsTypes } from '../../store/types/foods.type';
import { ProgressSpinner } from 'primereact/progressspinner';
import InputContainer from '../inputs/inputContainer';
import StandardFileUpload from '../inputs/fileUpload';



const EditFoods = (props) =>{
//setting names for dropdowns.
const toast = useRef(null);
const [addonsName, setAddonsName] = useState(null);
const [selectedRestaurant, setSelectedRestaurant] = useState(null);
const [foodCategoryName, setFoodCategoryName] = useState(null);
const [restaurantName, setRestaurantName] = useState(null);
const router = useRouter();
const dispatch = useDispatch();
const history = useHistory();
const settingDropDownNames= () => {



    const addonsNames = props.addonslist.items.map(addon => {return{name: addon.name}});
    setAddonsName(addonsNames);
    

    const foodCategoryNames = props.foodCatlist.items.map(res => {return{name: res.name}});
    setFoodCategoryName(foodCategoryNames);

    const restaurantNames =  props.restaurants.items.map(res => {return{name: res.name}});
    setRestaurantName(restaurantNames);
   }

   const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
   const getFormErrorMessage = (name) => {
       return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
   };

   const formik = useFormik({
    initialValues:{
        resName: '',
        name: '',
        description: '',
        file: '',
        categoryName: '',
        restaurant_id:'',
        food_category_id: '',
        addons: '',
        image: 'imageurl',
        price: 0,
        discountPrice: 0,
        is_veg: false,
        featured: false,
        active: false
    },
    validate: (data)=>{
        let errors:any = {};

        if (!data.resName) {
            errors.restaurant = 'restaurant is required.';
        }
        else{
            let selectedRestaurants = props.restaurants.items.filter(data  => {return data.name.localeCompare(formik.values.resName.name)==0;});
            formik.values.restaurant_id = selectedRestaurants[0]._id;
        }
        if (!data.name) {
            errors.name = 'name is required.';
        }
        if (!data.description) {
            errors.description = 'description is required.';
        }
        if (!data.image) {
            errors.image = 'Image is required.';
        }

        if (!data.categoryName) {
            errors.categoryName = 'categoryName is required.';
        }
        else{
            let selectedCategory = props.foodCatlist.items.filter(data  => {return data.name.localeCompare(formik.values.categoryName.name)==0;});
            formik.values.food_category_id = selectedCategory[0]._id;
        }

        if (!data.addons) {
            errors.addons = 'addons required.';
        }
        return errors;
    },
    onSubmit: (data:any) => {
        // setFormData(data);
        // setShowMessage(true);
        dispatch(updateFood(props.id,data));

    }
});

useEffect(() =>{



    if(props.addonSuccess && props.restaurantsSuccess && props.foodCatSuccess && props.foodSuccess)
    {

            settingDropDownNames();
            setSelectedRestaurant(()=>{
            let selectedRes = props.restaurants.items.filter(data  => {return data._id === props.foods.restaurant_id?._id});
            return selectedRes[0];
            });
            if(props.foods)
            {

                formik.values.resName = {name : props.foods.restaurant.name};
                formik.values.categoryName = {name : props.foods.food_category.name};
                formik.values.name = props.foods.name;
                formik.values.description = props.foods.description;
                formik.values.price = props.foods.price;
                formik.values.discount_price = props.foods.discount_price;
                formik.values.is_veg = props.foods.is_veg;
                formik.values.active = props.foods.active;
                formik.values.featured = props.foods.featured;
        }



    }
    if(props.updatedFoodSuccess){
        dispatch({
            type: foodsTypes.FOOD_UPDATE_RESET
          })
          dispatch({
            type: foodsTypes.FOOD_FIND_RESET
          })
        //   history.push('/restaurants', {from: "pages/restaurants/index"});
        // history.go
        if(router.query.resId)
            router.push('/restaurants');
        else
            router.back();
    }
}, [props.updatedFoodSuccess,props.addonSuccess,props.foodCatSuccess,props.restaurantsSuccess,props.foodSuccess,selectedRestaurant, router.query.id]);


function multiSelect(){
    if(addonsName != null)
    return(
        <div>
                <MultiSelect id="addons" name="addons" value={formik.values.addons} options={addonsName} onChange={formik.handleChange} optionLabel="name" placeholder="Select addons" display="addons" className={classNames({ 'p-invalid': isFormFieldValid('addons') })}/>
            {/* <MultiSelect value={selectedAddonName} options={addonsName} onChange={(e) => setSelectedAddonName(e.value)} optionLabel="name" placeholder="Select a City" display="chip" /> */}
            </div>

)
}
return (

    <div id='edit_foods'>
    <h1 id='editHeader'>Yemek Oluştur</h1>
    <Toast id='toastMessage' ref={toast}></Toast>
    {!props.foods? <ProgressSpinner/> : <S.ContainerCard id='container'>
         <form id='editForm' onSubmit={formik.handleSubmit}  >
            <div className="p-fluid">
                <div id='restaurantDiv' className="p-field">
                    <h4 id='restaurantHeader'>Restauran</h4>
                    <Dropdown id="resName" name="resName" value={formik.values.resName} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('resName') })} />
                    <label id='errorRestaurant' htmlFor="resName" className={classNames({ 'p-error': isFormFieldValid('resName') })}></label>
                    {getFormErrorMessage('resName')}
                </div>
                <div id='nameDiv' className="p-field">
                    <h4 id='nameHeader'>Yemek Adı</h4>
                    <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                    <label id='errorName' htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                    {getFormErrorMessage('name')}
                </div>
                <div id='descriptionDiv' className="p-field">
                    <h4 id='descriptionHeader'>Yemek Açıklaması</h4>
                    <InputText id="description" name="description" value={formik.values.description} onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                    <label id='errorDescription' htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                    {getFormErrorMessage('description')}
                </div>
            </div>
            <InputContainer  name="image" label="Görseller" getFormErrorMessage={getFormErrorMessage} isFormFieldValid={isFormFieldValid}>
                <StandardFileUpload
                        id='fileUpload' 
                        setFile={(image)=>{formik.values.image=image}}
                        showSuccess={()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}}
                     >   
                </StandardFileUpload>
            </InputContainer>
            <div className="p-fluid">
                <div id='categoriesNameDiv'  className="card">
                    <h4 id='categoriesHeader'>Yemek Kategorisi</h4>
                    <Dropdown id="categoryName" name="categoryName" value={formik.values.categoryName} options={foodCategoryName} onChange={formik.handleChange} optionLabel="name" placeholder="Yemek Kategorisi" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('categoryName') })}/>
                    <label id='errorCategories' htmlFor="categoryName" className={classNames({ 'p-error': isFormFieldValid('categoryName') })}></label>
                                {getFormErrorMessage('categoryName')}
                    <h4 id='addonsHeader'>Eklentileri Seç</h4>
                    <div id='addonsMultiSelectDiv'>
                        {multiSelect()}
                        <label id='errorAddons' htmlFor="addons" className={classNames({ 'p-error': isFormFieldValid('addons') })}></label>
                                {getFormErrorMessage('addons')}
                    </div>

                </div>
            </div>
            <div id='numberInputDiv' className="p-grid p-fluid">
                <div id='priceDiv' className="p-field p-col-12 p-md-3">
                    <h4 id='priceHeader'> Fiyat</h4>
                    <InputNumber id="price" name="price" value={formik.values.price} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                </div>
                <div id='discountDiv' className="p-field p-col-12 p-md-3">
                    <h4 id='discountHeader'> İndirimli Fiyat</h4>
                    <InputNumber id="discountPrice" name="discountPrice" value={formik.values.discountPrice} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                </div>
            </div>
            <div id='inpoutSwitchDiv'>
                {/* <Route path ="/restaurants" component={Restaurants}/> */}
                <h4 id='vegiHeader'>Saf Sebze Mi</h4>
                <InputSwitch checked={formik.values.is_veg} name="is_veg" id="is_veg"  onChange={formik.handleChange} />

                <h4 id='featuredHeader'>Öne Çıkma</h4>
                <InputSwitch checked={formik.values.featured} name="featured" id="featured" onChange={formik.handleChange} />

                <h4 id='activeHeader'>Aktif</h4>
                <InputSwitch checked={formik.values.active} name="active" id="active" onChange={formik.handleChange} />
            </div>
            <S.SubmitBtn id="btnContainer">
                <Button id='editBtn' type="submit" label="Gönder"/>
            </S.SubmitBtn>
        </form>
    </S.ContainerCard>
}
</div>
)
}
export default EditFoods;