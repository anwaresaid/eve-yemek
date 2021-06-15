import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/create-food/food.create.style';
import { InputSwitch } from 'primereact/inputswitch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useRouter } from 'next/router';
import { getFoodCategoryDetails, updateFoodCategory } from '../../store/actions/foodCategory.action';
import { foodCategoryTypes } from '../../store/types/foodCategory.type';
import { useFormik } from 'formik';
import classNames from 'classnames'
import InputContainer from '../../components/inputs/inputContainer';
import StandardFileUpload from '../../components/inputs/fileUpload';
import { i18n } from '../../language';

export const FoodCategoryEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [categoryName, setCategoryName] = useState('');

  const foodCategoryDetails = useSelector((state:RootState) => state.foodCategoryDetails);
  const { foodCategory, loading, success: detailsSuccess } = foodCategoryDetails;

  const updatedFoodCategory = useSelector((state:RootState) => state.updateFoodCategory);
  const { loading: loadingUpdate, success: successUpdate } = updatedFoodCategory;

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
            errors.name = 'user name is required.';
        }
        if (!data.image) {
            errors.image = 'image is required.';
        }
        return errors;
    },
    onSubmit: (data:any) => {
        // setFormData(data);
        // setShowMessage(true);
        dispatch(updateFoodCategory(foodCategory.id,data));

    }
});

  useEffect(() => {
      if(detailsSuccess && foodCategory.id === router.query.id){
        formik.values.active = foodCategory.active;
        formik.values.name = foodCategory.name;
        if(successUpdate){
          dispatch({
            type: foodCategoryTypes.FOOD_CATEGORY_UPDATE_RESET
          })
          dispatch({
            type: foodCategoryTypes.FOOD_CATEGORY_DETAILS_RESET
          })
          router.push('/food_categories')
        }
      }else{
        dispatch(getFoodCategoryDetails(router.query.id))
      }
  }, [dispatch, detailsSuccess, foodCategory, successUpdate]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid
  }


  return (
    <div id="edit_food_categories">
      <h1 id="editHeader">Kategori Detayi</h1>
      <Toast id="toastMessage" ref={toast}></Toast>
      <S.ContainerCard id="container">
        <form id="editForm" onSubmit={formik.handleSubmit}>
          <div className='p-fluid'>
            <div id="nameDiv" className='p-field'>
              <h4>Kategori Adı</h4>
              <InputText id='name' name='name' value={formik.values.name} onChange={formik.handleChange} type='text' className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
              <label id="errorName" htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
              {getFormErrorMessage('name')}
            </div>
          </div>
          <div className="p-field p-col-12">
              <InputContainer label={i18n.t('image')} name="file" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                  setFile:(image)=>{ formik.values.image=image },
                  showSuccess:()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}
              }}/>
          </div>
          <div>
            <h4>Aktif Mi</h4>
            <InputSwitch checked={formik.values.active} onChange={formik.handleChange} />
          </div>
          <S.SubmitBtn id="btnContainer">
            <Button id="editBtn" type='submit' label={i18n.t('submit')}/>
          </S.SubmitBtn>
        </form>
      </S.ContainerCard>
    </div>
  );
};

export default FoodCategoryEdit;
