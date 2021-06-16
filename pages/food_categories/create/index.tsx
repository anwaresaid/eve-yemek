import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style';
import { InputSwitch } from 'primereact/inputswitch';
import { createFoodCategory } from '../../../store/actions/foodCategory.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { foodCategoryTypes } from '../../../store/types/foodCategory.type';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { i18n } from '../../../language';
import InputContainer from '../../../components/inputs/inputContainer';
import StandardFileUpload from '../../../components/inputs/fileUpload';
import FormColumn from "../../../components/inputs/formColumn";
import InputGroup from "../../../components/inputs/inputGroup";

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef(null);
  const foodCategoryCreate = useSelector((state:RootState) => state.createFoodCategory);
  const { success } = foodCategoryCreate;

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
  const formik = useFormik({
    initialValues:{
        name: '',
        image:'',
        active:false,
    },
    validate: (data)=>{
        let errors:any = {};

        if (!data.name) {
            errors.name = i18n.t('isRequired', {input: i18n.t('userName')});;
        }
        if (!data.image) {
            errors.image = i18n.t('isRequired', {input: i18n.t('image')});;
        }
        return errors;
    },
    onSubmit: (data:any) => {
        // setFormData(data);
        // setShowMessage(true);
        dispatch(createFoodCategory(data));

    }
});

  useEffect(() => {
    if(success){
      router.push('/food_categories')
      dispatch({type: foodCategoryTypes.FOOD_CATEGORY_CREATE_RESET})
    }
  }, [success]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid
  }


  return (
    <div id="edit_food_categories">
      <h1 id="editHeader">{i18n.t('create')}</h1>
      <Toast id="toastMessage" ref={toast}></Toast>
      <S.ContainerCard id="container">
            <form id="editForm" onSubmit={formik.handleSubmit}>
                <div className="p-grid">
            <FormColumn divideCount={3}>
            <InputGroup>
            <InputContainer label={i18n.t('name')} name="name" formiks={inputFormiks} component={InputText} iprops={{
                value: formik.values.name,
                onChange: formik.handleChange,
                }} />
                  <InputContainer label={i18n.t('image')} name="file" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                    setFile:(image)=>{ formik.values.image=image },
                    showSuccess:()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}
                  }}/>
                    
                <InputContainer label={i18n.t('active')} name="active" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                  value: formik.values.active,
                  checked: formik.values.active,
                  onChange: formik.handleChange
                }} />


                </InputGroup>
                <S.SubmitBtn id="btnContainer">
                  <Button id="editBtn" type='submit' label={i18n.t('submit')}/>
                </S.SubmitBtn>

              </FormColumn>
              </div>
            </form>
          </S.ContainerCard>

    </div>
  )};

export default Index;
