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
import {updateRestaurant} from '../../../store/actions/restaurant.action';
import {listRestaurantOwners} from '../../../store/actions/restaurant.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { InputMask } from 'primereact/inputmask';


    const UpdateRestaurants = () => {

    const [totalSize, setTotalSize] = useState(0);
    const [files, setFile] = useState(null);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [resOwnersName, setResOwnersName] = useState(null);
    const [vegi, setVegi] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [active, setActive] = useState(false);
    const [foodName, setFoodName] = useState(null);
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [rating, setRating] = useState(null);
    const [deliveryTime, setDeliveryTime] = useState(null);
    const [address, setAddress] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [commission, setCommission] = useState(null);
    const [license, setLicense] = useState(null);
    const [resCharge, setResCharge] = useState(null);
    const [deliveryRad, setDeliveryRad] = useState(null);
    const dispatch = useDispatch();

//setting dropdown selected items
    const [selectedResOwner, setSelectedResOwner] = useState(null);
    const [selectedResOwnernName, setSelectedResOwnerName] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
    
    
//use selectors for setting dispatch to variable.
    const resOwnersList = useSelector((state:RootState) => state.listRestaurantOwners);
    const { loading, success:resOnwersSuccess, restaurantOwners: resOwnerslist } = resOwnersList;

//setting names for dropdowns.
    const settingDropDownNames= () => {
        const restOnwersName = resOwnerslist.items.map(resOwner => {return{name: resOwner.name}});
        setResOwnersName(restOnwersName);
       }

    
    useEffect(() =>{
        if(!resOnwersSuccess)
            dispatch(listRestaurantOwners());
        if(resOnwersSuccess)
            settingDropDownNames();
          

       
    }, [resOnwersSuccess]);
  
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
//on change functions    
    const onResOwnerChange= (e:any) => {
        let selectedResOwner = resOwnerslist.items.filter(data  => {return data.name.localeCompare(e.value.name)==0;});
        setSelectedResOwner(selectedResOwner[0]);
        setSelectedResOwnerName(e.value);
    }
    const onCityChange = (e) => {
        setSelectedCity(e.value);
    }
    const onCountyChange = (e) => {
        setSelectedCounty(e.value);
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
               
               }
               dispatch(updateRestaurant(creatingFood))     
               console.log(creatingFood);
       };

    return (
        <div>
            <h1>Oluştur</h1>
            <Toast ref={toast}></Toast>
             <S.ContainerCard>
                 <form onSubmit = {onSubmit} >
                     
                    <div className="p-fluid">
                        <div className="p-field p-col-12">
                            <h4>Ad</h4>
                            <InputText id="foodName "  onChange={onNameChange} type="text"/>
                        </div>
                        <div className="p-field p-col-12">
                            <h4>Açıklama</h4>
                            <InputText id="description" onChange={onDescriptionChange} type="text"/>
                        </div>
                        <div className="p-field p-col-12">
                            <h4>Restoran Sahibi </h4>
                            <Dropdown value={selectedResOwner} options={resOwnersName} onChange={onResOwnerChange} optionLabel="name" placeholder="Select a City" />
                        </div>
                    </div>
                    <div className="p-field p-col-12">
                        <FileUpload ref={fileUploadRef} name="image" url="./" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions} 
                            uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Telefon</h4>
                        <InputMask id="phone" mask="(999) 999-9999" value={phoneNumber} placeholder="(999) 999-9999" onChange={(e) => setPhoneNumber(e.value)}></InputMask>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Email</h4>
                        <InputText id="inputtext" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Şehir</h4>
                        <Dropdown value={selectedCity} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Yemek Kategorisi" />
                        <h4>İlçe</h4>
                        <Dropdown value={selectedCounty} options={counties} onChange={onCountyChange} optionLabel="name" placeholder="Eklentileri Seç" />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Derece</h4>
                        <InputNumber id="stacked" value={rating} onValueChange={(e) => setRating(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4> Tahmini Teslim Süresi (dakika)</h4>
                        <InputNumber id="stacked" value={deliveryTime} onValueChange={(e) => setDeliveryTime(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Açık Adres</h4>
                        <InputText id="inputtext" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Posta kodu</h4>
                        <InputText id="inputtext" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Enlem</h4>
                        <InputNumber id="stacked" value={lat} onValueChange={(e) => setLat(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Boylam</h4>
                        <InputNumber id="stacked" value={long} onValueChange={(e) => setLong(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Komisyon Oranı %</h4>
                        <InputNumber id="stacked" value={commission} onValueChange={(e) => setCommission(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <h4>Lisans Kodu</h4>
                        <InputText id="inputtext" value={license} onChange={(e) => setLicense(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Restoran Ücreti</h4>
                        <InputNumber id="stacked" value={resCharge} onValueChange={(e) => setResCharge(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Teslimat Yarıçapı (km)</h4>
                        <InputNumber id="stacked" value={deliveryRad} onValueChange={(e) => setDeliveryRad(e.value)} showButtons mode="currency" currency="TRY" />
                    </div>
                <div className="p-fluid">
            </div>
            <div>
                <h4>Saf Sebze Mi</h4>
                <InputSwitch checked={vegi} onChange={(e) => setVegi(e.value)} />
                
                <h4>Öne Çıkma</h4>
                <InputSwitch checked={featured} onChange={(e) => setFeatured(e.value)} />

                <h4>Açık?</h4>
                <InputSwitch checked={active} onChange={(e) => setActive(e.value)} />
            </div>

            <S.SubmitBtn>

                <Button type="submit" label="Create"/>
            </S.SubmitBtn>
            </form>
            </S.ContainerCard>
        </div>
    )
}

 export default  (UpdateRestaurants);