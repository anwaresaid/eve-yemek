import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import {findAddons, updateAddons } from '../../store/actions/addons.action';
import {listAddonCategory} from '../../store/actions/addon-category.action';
import {createAddons} from '../../store/actions/addons.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { InputSwitch } from 'primereact/inputswitch';
import { addonsTypes } from '../../store/types/addons.type';
import { Toast } from 'primereact/toast';



export const Index = () => {

    const [addonCategoryName, setAddonCategoryName] = useState(null);
    const [reloadCheck,setReloadCheck] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useRef(null);
//use selectors for setting dispatch to variable.
    const resAddon = useSelector((state:RootState) => state.findAddons);
    const { loading, success, addon  } = resAddon;
    const resAddonCat = useSelector((state:RootState) => state.listAddonCategory);
    const { loading: addonCatLoading, success: addonCatSuccess, addonCat: addonCatlist } = resAddonCat;
    const resAddonUpdate = useSelector((state:RootState) => state.updateAddons);
    const { loading: addonsUpdateLoading, success: addonsUpdatedSuccess, addons: addonUpdate } = resAddonUpdate;
   
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const formik = useFormik({
        initialValues:{
            name: '',
            addonCat:'',
            addOn_category_id:'',
            price: 0,
            active: ''
           
        },
        validate: (data)=>{
            let errors:any = {}
            if(!data.name){

                errors.name = 'addon name is required.';
            }
            
            if (!data.addonCat) {
                errors.name = 'addon category is required.';
            }else{
                let selectedAddons = addonCatlist.items.filter(data  => {return data.name.localeCompare(formik.values.addonCat.name)==0;});
                if(selectedAddons!=null)
                    formik.values.addOn_category_id = selectedAddons[0]?._id;
            }

            return errors;
        },
        onSubmit: (data:any) => {
            // setFormData(data);
            // setShowMessage(true);
            console.log(data);
            dispatch(updateAddons(addon.id,data));
            

        }
    });
//setting names for dropdowns.
    const settingDropDownNames= () => {
        const addonCatName = addonCatlist.items.map(res => {return{name: res.name}});
        setAddonCategoryName(addonCatName);
       }


    useEffect(() =>{
    
        if(addonCatSuccess&&success){
            if(addon.id === router.query.id){
                setReloadCheck(true);
            }
            else{
                setReloadCheck(false);
            }
        }
        if(!reloadCheck){
            dispatch(listAddonCategory());
            dispatch(findAddons(router.query.id));
        }
        if(addonsUpdatedSuccess){
            dispatch({
                type: addonsTypes.ADDON_UPDATE_RESET
            });
            dispatch({
                type: addonsTypes.ADDON_FIND_RESET
            });
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Addon Updated Successfully',
              });
        }

    }, [dispatch,router.query.id]);
    useEffect(() =>{
        if(addonCatSuccess&&success){
            let catName =  addonCatlist.items.filter(data  => {return data._id.localeCompare(addon.addOn_category_id)==0;})
            formik.values.name = addon.name; 
            formik.values.addonCat = {name: catName.name};
            formik.values.price = addon.price;
            formik.values.active = addon.active;
            settingDropDownNames();
        }
        
    },[addonCatSuccess,success])

    // const filterByReference = (selectedAddons) => {
    //     let res = [];
    //     res =  addonslist.items.filter(addon => {
    //        return selectedAddons.find(sAddon => {
    //           return sAddon.name === addon.name;
    //        });
    //     });
    //     return res;
    //  }


    return (
        <div>
            <h1>{addon&& addon.name} Eklenti</h1>
            <Toast ref={toast}></Toast>
            <S.ContainerCard>
                 <form onSubmit={formik.handleSubmit}  >
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>Eklenti Adı </h4>
                            <InputText id="name" name="name" value={formik.values.name}  onChange={formik.handleChange} type="text"  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field">
                            <h4>Eklenti Kategorisi </h4>
                            <Dropdown id="addonCat" name="addonCat" value={formik.values.addonCat} options={addonCategoryName} onChange={formik.handleChange} optionLabel="name" placeholder="Select an addon category" autoFocus className={classNames({ 'p-invalid': isFormFieldValid('addonCat') })} />
                            <label htmlFor="addonCat" className={classNames({ 'p-error': isFormFieldValid('addonCat') })}></label>
                            {getFormErrorMessage('addonCat')}
                        </div>
                    </div>
                    <div className="p-grid p-fluid">
                        <div className="p-field p-col-12 p-md-3">
                            <h4> Fiyat</h4>
                            <InputNumber id="price" name="price" value={formik.values.price} onValueChange={formik.handleChange} showButtons mode="currency" currency="TRY" />
                        </div>
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <h4>Saf Sebze Mi</h4>
                        <InputSwitch  id="active " name="active"  checked={formik.values.active} onChange={formik.handleChange}   className={classNames({ 'p-invalid': isFormFieldValid('active') })}/>
                        <label htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                                    {getFormErrorMessage('active')}
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