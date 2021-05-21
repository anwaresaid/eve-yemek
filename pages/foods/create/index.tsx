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
import { classNames } from 'primereact/utils';

export const Index = () => {

    const [totalSize, setTotalSize] = useState(0);
    const [files, setFile] = useState(null);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [price, setPrice] = useState(0);
    const [addonsName, setAddonsName] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [vegi, setVegi] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [active, setActive] = useState(false);
    const [foodName, setFoodName] = useState(null);
    const [description, setDescription] = useState();
    const [foodCategoryName, setFoodCategoryName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();

//setting dropdown selected items
    const [selectedAddon, setSelectedAddon] = useState(null);
    const [selectedAddonName, setSelectedAddonName] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedRestaurantName, setSelectedRestaurantName] = useState(null);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState(null);
    const [selectedFoodCategoryName, setSelectedFoodCategoryName] = useState(null);
    
//use selectors for setting dispatch to variable.
    const addonList = useSelector((state:RootState) => state.listAddons);
    const { loading: addonsLoading, success:addonSuccess, addons: addonslist } = addonList;
    const resFoodCat = useSelector((state:RootState) => state.listFoodCategory);
    const { loading: foodCatLoading, success: foodCatSuccess, foodCat: foodCatlist } = resFoodCat;
    const resRestaurants = useSelector((state:RootState) => state.listRestaurant);
    
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants: restaurants } = resRestaurants;
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const formik = useFormik({
        initialValues:{
            restaurant: '',
            name: '',
            description: '',
            file: '',
            category: '',
            addons: '',
            price: 0,
            discountPrice: 0,
            vegi: false,
            featured: false,
            active: false
        },
        validate: (data)=>{
            let errors = {
                restaurant: '',
                name: '',
                description: '',
                file: '',
                category: '',
                addons: '',
            };

            if (!data.restaurant) {
                errors.restaurant = 'restaurant is required.';
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

            if (!data.category) {
                errors.category = 'category is required.';
            }
            if (!data.addons) {
                errors.addons = 'addons required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            let selectedRestaurants = restaurants.items.filter(data  => {return data.name.localeCompare(formik.values.restaurant)==0;});
            let res = selectedRestaurants;
            console.log("checking full restaurant", res );
            // dispatch(createFood(data.name, data.file, data.price,data.discountPrice, data.restaurant._id, data.category._id, addons._id , data.vegi, data.featured, data.active, data.description ));
                const creatingFood = { 
                                name: data.name, 
                                image: data.file, 
                                price: data.price,
                                discount_price: data.discountPrice , 
                                restaurant_id: data.restaurant, 
                                food_category_id: data.category, 
                                add_on_id: data.addons,
                                is_veg: data.vegi,
                                featured: data.featured,
                                active: data.active,
                                description: data.description,        
            }
            
            formik.resetForm();
        }
    });
//setting names for dropdowns.
    const settingDropDownNames= () => {
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
  

    const filterByReference = (selectedAddons) => {
        let res = [];
        res =  addonslist.items.filter(addon => {
           return selectedAddons.find(sAddon => {
              return sAddon.name === addon.name;
           });
        });
        return res;
     }
    const onCategoryChange= (e:any) => {
        let selectedCategory = foodCatlist.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        formik.values.category = selectedCategory[0];
        // setSelectedFoodCategory(selectedCategory[0]);
        setSelectedFoodCategoryName(e.value);
    }
    const onRestaurantChange= (e:any) => {
        let selectedRestaurants = restaurants.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        formik.values.restaurant = selectedRestaurants;
        // setSelectedRestaurant(selectedRestaurants[0]);
        setSelectedRestaurantName(e.value);

    }
    const onNameChange= (e:any) => {
        setFoodName((e?.target as any)?.value)
    }
    const onDescriptionChange= (e:any) => {
        setDescription((e?.target as any)?.value)
    }

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
        formik.values.file=e.files[0];
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
                <MultiSelect id="addons" name="addons" value={formik.values.addons} options={addonsName} onChange={formik.handleChange} optionLabel="name" placeholder="Select addons" display="addons" className={classNames({ 'p-invalid': isFormFieldValid('category') })}/>
                {/* <MultiSelect value={selectedAddonName} options={addonsName} onChange={(e) => {setSelectedAddonName(e.value); 
                var selectedaddons; 
                if(selectedAddonName)
                    selectedaddons = filterByReference(selectedAddonName);
                if(selectedaddons){
                    let addonsId = selectedaddons.map(addon=> addon._id);
                    setSelectedAddon(addonsId);
                }
                }} optionLabel="name" placeholder="Select addons" display="addons" /> */}
                </div>

            )
    }
    // on submit function    
    // const onSubmit = (e:any) => {
    //     e.preventDefault();
    //    const creatingFood = { 
    //             name: foodName, 
    //             image: files.objectURL, 
    //             price: price,
    //             discount_price: discountPrice , 
    //             restaurant_id: selectedRestaurant._id, 
    //             food_category_id: selectedFoodCategory._id, 
    //             add_on_id: selectedAddon._id,
    //             is_veg: vegi,
    //             featured: featured,
    //             active: active,
    //             description: description,
    //            }
    //            dispatch(createFood(creatingFood))     
    //    };
    
    {console.log("name",restaurants)}
    return (
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
            <S.ContainerCard>
                 <form onSubmit = {formik.handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>Restauran</h4>
                            <Dropdown id="restaurant" name="restaurant" value={formik.values.restaurant} options={restaurantName} onChange={formik.handleChange} optionLabel="name" placeholder="Select a Restaurant" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('restaurant') })} />
                            <label htmlFor="restaurant" className={classNames({ 'p-error': isFormFieldValid('restaurant') })}></label>
                            {getFormErrorMessage('restaurant')}
                        </div>
                        <div className="p-field">
                            <h4>Yemek Adı</h4>
                            <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field">
                            <h4>Yemek Açıklaması</h4>
                            <InputText id="description" name="description" onChange={formik.handleChange} type="text"    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('description') })}/>
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
                            <Dropdown id="category" name="category" value={formik.values.category} options={foodCategoryName} onChange={formik.handleChange} optionLabel="name" placeholder="Yemek Kategorisi" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('category') })}/>
                            <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid('category') })}></label>
                                        {getFormErrorMessage('category')}
                            <h4>Eklentileri Seç</h4>
                            {/* <Dropdown value={selectedAddonName} options={addonsName} onChange={onAddonChange} optionLabel="name" placeholder="Eklentileri Seç" /> */}
                            <div>
                                {multiSelect()}
                                <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid('category') })}></label>
                                        {getFormErrorMessage('category')}
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
                    
                        <h4>Saf Sebze Mi</h4>
                        <InputSwitch checked={formik.values.vegi} name="vegi" id="vegi"  onChange={formik.handleChange} />
                        
                        <h4>Öne Çıkma</h4>
                        <InputSwitch checked={formik.values.featured} name="featured" id="featured" onChange={formik.handleChange} />

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