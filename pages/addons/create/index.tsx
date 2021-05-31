import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import {listAddons} from '../../../store/actions/addons.action';
import {listAddonCategory} from '../../../store/actions/addon-category.action';
import {createAddons} from '../../../store/actions/addons.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import { useFormik } from 'formik';
import classNames from 'classnames'


export const Index = () => {

    const [addonCategoryName, setAddonCategoryName] = useState(null);
    const dispatch = useDispatch();

//use selectors for setting dispatch to variable.
    const addonList = useSelector((state:RootState) => state.listAddons);
    const { loading: addonsLoading, success:addonSuccess, addons: addonslist } = addonList;
    const resAddonCat = useSelector((state:RootState) => state.listAddonCategory);
    const { loading: addonCatLoading, success: addonCatSuccess, addonCat: addonCatlist } = resAddonCat;
   
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
            active: true
           
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
            dispatch(createAddons(data));
            

        }
    });
//setting names for dropdowns.
    const settingDropDownNames= () => {
        const addonCatName = addonCatlist.items.map(res => {return{name: res.name}});
        setAddonCategoryName(addonCatName);


       }


    useEffect(() =>{
        if(!addonSuccess)
            dispatch(listAddons());

        if(!addonCatSuccess)
            dispatch(listAddonCategory());

        if(addonSuccess && addonCatSuccess)
                settingDropDownNames();
    }, [addonSuccess,addonCatSuccess]);


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
            <h1>Oluştur</h1>
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
                    <S.SubmitBtn>
                        <Button type="submit" label="Submit"/>
                    </S.SubmitBtn>
                </form>
            </S.ContainerCard>
    </div>
    )
}

 export default  (Index);