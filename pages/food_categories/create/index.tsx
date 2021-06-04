import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import * as S from '../../../styles/food/create-food/food.create.style';
import { InputSwitch } from 'primereact/inputswitch';
import { createFoodCategory } from '../../../store/actions/foodCategory.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { foodCategoryTypes } from '../../../store/types/foodCategory.type';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames'
import { i18n } from '../../../language';
import InputContainer from '../../../components/inputs/inputContainer';
import StandardFileUpload from '../../../components/inputs/fileUpload';

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

  return (
    <div>
      <h1>{i18n.t('createMealCategory')}</h1>
      <Toast ref={toast}></Toast>
      <S.ContainerCard>
        <form onSubmit={formik.handleSubmit}>
          <div className='p-fluid'>
            <div className='p-field'>
              <h4>{i18n.t('categoryName')}</h4>
              <InputText id='name' name='name' onChange={formik.handleChange} type='text' className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
              <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
              {getFormErrorMessage('name')}
            </div>
          </div>
          <InputContainer name="image" label="Görseller" getFormErrorMessage={getFormErrorMessage} isFormFieldValid={isFormFieldValid}>
                <StandardFileUpload 
                        setFile={(image)=>{formik.values.image=image}}
                        showSuccess={()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}}
                     >   
                </StandardFileUpload>
            </InputContainer>
          <div>
            <h4>{i18n.t('active')}</h4>
            <InputSwitch checked={formik.values.active} onChange={formik.handleChange} />
          </div>

          <S.SubmitBtn>
            <Button type='submit' label='Submit' />
          </S.SubmitBtn>
        </form>
      </S.ContainerCard>
    </div>
  );
};

export default Index;
