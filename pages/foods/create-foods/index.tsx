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
import {listRestaurants} from '../../../store/actions/restaurants.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';

export const CreatFoods = () => {

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
    const resRestaurants = useSelector((state:RootState) => state.listRestaurants);
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants: restaurants } = resRestaurants;

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
            dispatch(listRestaurants());

        if(addonSuccess && restaurantsSuccess && foodCatSuccess)
                settingDropDownNames();
    }, [addonSuccess,foodCatSuccess,restaurantsSuccess]);
  
//on change functions    
    const onAddonChange= (e:any) => {
        let selectedaddons = addonslist.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        setSelectedAddon(selectedaddons[0]);
        setSelectedAddonName(e.value);
    }
    const onCategoryChange= (e:any) => {
        let selectedCategory = foodCatlist.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        setSelectedFoodCategory(selectedCategory[0]);
        setSelectedFoodCategoryName(e.value);
    }
    const onRestaurantChange= (e:any) => {
        let selectedRestaurants = restaurants.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        setSelectedRestaurant(selectedRestaurants[0]);
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
        setFile(e.files[0]);
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

    // on submit function    
    const onSubmit = (e:any) => {
        e.preventDefault();
       const creatingFood = { 
                name: foodName, 
                image: files.objectURL, 
                price: price,
                discount_price: discountPrice , 
                restaurant_id: selectedRestaurant._id, 
                food_category_id: selectedFoodCategory._id, 
                add_on_id: selectedAddon._id,
                is_veg: vegi,
                featured: featured,
                active: active,
                description: description,
               }
               dispatch(createFood(creatingFood))     
               console.log(creatingFood);
       };

    return (
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
             <S.ContainerCard>
                 <form onSubmit = {onSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                        <h4>Restauran</h4>
                <Dropdown value={selectedRestaurantName} options={restaurantName} onChange={onRestaurantChange} optionLabel="name" placeholder="Select a City" />
                        </div>
                        <div className="p-field">
                            <h4>Yemek Adı</h4>
                            <InputText id="foodName "  onChange={onNameChange} type="text"/>
                        </div>
                        <div className="p-field">
                            <h4>Yemek Açıklaması</h4>
                            <InputText id="description" onChange={onDescriptionChange} type="text"/>
                        </div>
                    </div>
            <FileUpload ref={fileUploadRef} name="image" url="./" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions} 
                uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                <div className="p-fluid">
                        <div className="card">
                <h4>Yemek Kategorisi</h4>
                <Dropdown value={selectedFoodCategoryName} options={foodCategoryName} onChange={onCategoryChange} optionLabel="name" placeholder="Yemek Kategorisi" />
                <h4>Eklentileri Seç</h4>
                <Dropdown value={selectedAddonName} options={addonsName} onChange={onAddonChange} optionLabel="name" placeholder="Eklentileri Seç" />
                </div>
            </div>
            <div className="p-grid p-fluid">
                    <div className="p-field p-col-12 p-md-3">
                        <h4> Fiyat</h4>
                        <InputNumber id="stacked" value={price} onValueChange={(e) => setPrice(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4> İndirimli Fiyat</h4>
                        <InputNumber id="stacked" value={discountPrice} onValueChange={(e) => setDiscountPrice(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
            </div>
            <div>
                
                <h4>Saf Sebze Mi</h4>
                <InputSwitch checked={vegi} onChange={(e) => setVegi(e.value)} />
                
                <h4>Öne Çıkma</h4>
                <InputSwitch checked={featured} onChange={(e) => setFeatured(e.value)} />

                <h4>Aktif</h4>
                <InputSwitch checked={active} onChange={(e) => setActive(e.value)} />
            </div>

            <S.SubmitBtn>

                <Button type="submit" label="Submit"/>
            </S.SubmitBtn>
            </form>
            </S.ContainerCard>
        </div>
    )
}

 export default  (CreatFoods);