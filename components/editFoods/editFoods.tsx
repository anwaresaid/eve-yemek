
import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
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



const EditFoods = (props) =>{
//setting names for dropdowns.
const [totalSize, setTotalSize] = useState(0);
const toast = useRef(null);
const fileUploadRef = useRef(null);
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
   const handleHistory = () =>{
       history.push('/restaurants')
   }

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
        if (!data.file) {
            errors.file = 'Image is required.';
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
    // setFile(e.files[0]);
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

    <div>
    <h1>Yemek Oluştur</h1>
    <Toast ref={toast}></Toast>
    {!props.foods? <ProgressSpinner/> : <S.ContainerCard>
         <form onSubmit={formik.handleSubmit}  >
            <div className="p-fluid">
                <div className="p-field">
                    <h4>Restauran</h4>
                    <Dropdown id="resName" name="resName" value={formik.values.resName} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('resName') })} />
                    <label htmlFor="resName" className={classNames({ 'p-error': isFormFieldValid('resName') })}></label>
                    {getFormErrorMessage('resName')}
                </div>
                <div className="p-field">
                    <h4>Yemek Adı</h4>
                    <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                    {getFormErrorMessage('name')}
                </div>
                <div className="p-field">
                    <h4>Yemek Açıklaması</h4>
                    <InputText id="description" name="description" value={formik.values.description} onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
                    <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid('description') })}></label>
                    {getFormErrorMessage('description')}
                </div>
            </div>
            <FileUpload ref={fileUploadRef} id="file" name="file" url="./" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
                uploadOptions={uploadOptions} cancelOptions={cancelOptions} className={classNames({ 'p-invalid': isFormFieldValid('file') })} />
                  <label htmlFor="file" className={classNames({ 'p-error': isFormFieldValid('file') })}></label>
                                {getFormErrorMessage('file')}
            <div className="p-fluid">
                <div className="card">
                    <h4>Yemek Kategorisi</h4>
                    <Dropdown id="categoryName" name="categoryName" value={formik.values.categoryName} options={foodCategoryName} onChange={formik.handleChange} optionLabel="name" placeholder="Yemek Kategorisi" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('categoryName') })}/>
                    <label htmlFor="categoryName" className={classNames({ 'p-error': isFormFieldValid('categoryName') })}></label>
                                {getFormErrorMessage('categoryName')}
                    <h4>Eklentileri Seç</h4>
                    <div>
                        {multiSelect()}
                        <label htmlFor="addons" className={classNames({ 'p-error': isFormFieldValid('addons') })}></label>
                                {getFormErrorMessage('addons')}
                    </div>

                </div>
            </div>
            <div className="p-grid p-fluid">
                <div className="p-field p-col-12 p-md-3">
                    <h4> Fiyat</h4>
                    <InputNumber id="price" name="price" value={formik.values.price} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <h4> İndirimli Fiyat</h4>
                    <InputNumber id="discountPrice" name="discountPrice" value={formik.values.discountPrice} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                </div>
            </div>
            <div>
                {/* <Route path ="/restaurants" component={Restaurants}/> */}
                <h4>Saf Sebze Mi</h4>
                <InputSwitch checked={formik.values.is_veg} name="is_veg" id="is_veg"  onChange={formik.handleChange} />

                <h4>Öne Çıkma</h4>
                <InputSwitch checked={formik.values.featured} name="featured" id="featured" onChange={formik.handleChange} />

                <h4>Aktif</h4>
                <InputSwitch checked={formik.values.active} name="active" id="active" onChange={formik.handleChange} />
            </div>
            <S.SubmitBtn>
                <Button type="submit" label="Gönder"/>
            </S.SubmitBtn>
        </form>
    </S.ContainerCard>
}
</div>
)
}
export default EditFoods;