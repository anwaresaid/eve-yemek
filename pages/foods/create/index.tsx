import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import * as S from '../../../styles/food/create-food/food.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import {createFood} from '../../../store/actions/foods.action';
import {listAddons} from '../../../store/actions/addons.action';
import {listFoodCategory} from '../../../store/actions/foodCategory.action';
import {listRestaurant} from '../../../store/actions/restaurant.action';
import {useDispatch,useSelector} from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import {RootState} from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames'
import StandardFileUpload from '../../../components/inputs/fileUpload';
import InputContainer from '../../../components/inputs/inputContainer';
import { i18n } from '../../../language';


export const Index = () => {

    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const [addonsName, setAddonsName] = useState(null);
    const [foodCategoryName, setFoodCategoryName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);
    const dispatch = useDispatch();

//use selectors for setting dispatch to variable.
    const addonList = useSelector((state:RootState) => state.listAddons);
    const { loading: addonsLoading, success:addonSuccess, addons: addonslist } = addonList;
    const resFoodCat = useSelector((state:RootState) => state.listFoodCategory);
    const { loading: foodCatLoading, success: foodCatSuccess, foodCat: foodCatlist } = resFoodCat;
    const resRestaurants = useSelector((state:RootState) => state.listRestaurant);

    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants } = resRestaurants;

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
            discount_price: 0,
            is_veg: false,
            featured: false,
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
            if (!data.file) {
                errors.file = 'Image is required.';
            }

            if (!data.categoryName) {
                errors.categoryName = 'categoryName is required.';
            }
            else{
                let selectedCategory:any = foodCatlist.items.filter(data  => {return data.name.localeCompare(formik.values.categoryName.name)==0;});
                if(selectedCategory)
                    formik.values.food_category_id = selectedCategory[0]?._id;
            }
            if (!data.addons) {
                errors.addons = 'addons required.';
            }

            return errors;
        },
        onSubmit: (data:any) => {
            // setFormData(data);
            // setShowMessage(true);
            dispatch(createFood(data));

        }
    });
//setting names for dropdowns.
    const settingDropDownNames= () => {
        var res = restaurants.items
        const addonsNames = addonslist.items.map(addon => {return{name: addon.name}});
        setAddonsName(addonsNames);

        const foodCategoryNames = foodCatlist.items.map(res => {return{name: res.name}});
        setFoodCategoryName(foodCategoryNames);

        const restaurantNames =  restaurants.items.map(res => {return{name: res.name}});
        setRestaurantName(restaurantNames);
       }


    useEffect(() =>{
        if(!addonSuccess)
            dispatch(listAddons());

        if(!foodCatSuccess)
            dispatch(listFoodCategory());

        if(!restaurantsSuccess)
            dispatch(listRestaurant());

        if(addonSuccess && restaurantsSuccess && foodCatSuccess)
                settingDropDownNames();
    }, [addonSuccess,foodCatSuccess,restaurantsSuccess]);


    // const filterByReference = (selectedAddons) => {
    //     let res = [];
    //     res =  addonslist.items.filter(addon => {
    //        return selectedAddons.find(sAddon => {
    //           return sAddon.name === addon.name;
    //        });
    //     });
    //     return res;
    //  }


    function multiSelect(){
        if(addonsName != null)
            return(
                <div>
                <MultiSelect id="addons" name="addons" value={formik.values.addons} options={addonsName} onChange={formik.handleChange} optionLabel="name" placeholder="Select addons" display="addons" className={classNames({ 'p-invalid': isFormFieldValid('addons') })}/>
                </div>

            )
    }
    return (
        <div>
            <h1>{i18n.t('createMeal')}</h1>
            <Toast ref={toast}></Toast>
            <S.ContainerCard>
                 <form onSubmit={formik.handleSubmit}  >
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>{i18n.t('restaurant')}</h4>
                            <Dropdown id="resName" name="resName" value={formik.values.resName} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('resName') })} />
                            <label htmlFor="resName" className={classNames({ 'p-error': isFormFieldValid('resName') })}></label>
                            {getFormErrorMessage('resName')}
                        </div>
                        <div className="p-field">
                            <h4>{i18n.t('itemName')}</h4>
                            <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field">
                            <h4>{i18n.t('itemDescription')}</h4>
                            <InputText id="description" name="description" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                            <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                            {getFormErrorMessage('description')}
                        </div>
                    </div>
                       <InputContainer name="file" label={i18n.t('images')} getFormErrorMessage={getFormErrorMessage} isFormFieldValid={isFormFieldValid}>
                            <StandardFileUpload 
                                    totalSize={totalSize} 
                                    setTotalSize={setTotalSize} 
                                    setFile={(file)=>{formik.values.file=file}}
                                    showSuccess={()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}}
                                    >   
                            </StandardFileUpload>
                       </InputContainer>
                    <div className="p-fluid">
                        <div className="card">
                            <h4>{i18n.t('mealCategory')}</h4>
                            <Dropdown id="categoryName" name="categoryName" value={formik.values.categoryName}
                             options={foodCategoryName} onChange={formik.handleChange} optionLabel="name"
                              placeholder="Yemek Kategorisi" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('categoryName') })}/>
                            <label htmlFor="categoryName" className={classNames({ 'p-error': isFormFieldValid('categoryName') })}></label>
                                        {getFormErrorMessage('categoryName')}
                            <h4>{i18n.t('selectAddons')}</h4>
                            <div>
                                {multiSelect()}
                                <label htmlFor="addons" className={classNames({ 'p-error': isFormFieldValid('addons') })}></label>
                                        {getFormErrorMessage('addons')}
                            </div>

                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                        <div className="p-field p-col-12 p-md-3">
                            <h4>{i18n.t('price')}</h4>
                            <InputNumber id="price" name="price" value={formik.values.price} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <h4>{i18n.t('discountedPrice')}</h4>
                            <InputNumber id="discount_price" name="discount_price" value={formik.values.discount_price} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                        </div>
                    </div>
                    <div>

                        <h4>{i18n.t('vegetablesOnly')}</h4>
                        <InputSwitch checked={formik.values.vegi} name="vegi" id="vegi"  onChange={formik.handleChange} />

                        <h4>{i18n.t('prioritized')}</h4>
                        <InputSwitch checked={formik.values.featured} name="featured" id="featured" onChange={formik.handleChange} />

                        <h4>{i18n.t('active')}</h4>
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
