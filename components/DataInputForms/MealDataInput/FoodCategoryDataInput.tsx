import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as S from '../../../styles/food/create-food/food.create.style';
import { InputSwitch } from 'primereact/inputswitch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useRouter } from 'next/router';
import { getFoodCategoryDetails, updateFoodCategory } from '../../../store/actions/foodCategory.action';
import { foodCategoryTypes } from '../../../store/types/foodCategory.type';
import { useFormik } from 'formik';
import InputContainer from '../../inputs/inputContainer';
import StandardFileUpload from '../../inputs/fileUpload';
import { i18n } from '../../../language';
import FormColumn from "../../inputs/formColumn";
import InputGroup from "../../inputs/inputGroup";

export const FoodCategoryDataInput = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const [data, setData] = useState(false);


  const foodCategoryDetails = useSelector((state:RootState) => state.foodCategoryDetails);
  const { foodCategory, loading, success: detailsSuccess } = foodCategoryDetails;

  const updatedFoodCategory = useSelector((state:RootState) => state.updateFoodCategory);
  const { loading: loadingUpdate, success: successUpdate } = updatedFoodCategory;

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
   const foodCategoryCreate = useSelector((state:RootState) => state.createFoodCategory);
  const { success } = foodCategoryCreate;

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
      if(detailsSuccess && foodCategory.id === router.query.id && foodCategory){
        setData(true);
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
        setData(false);
        dispatch(getFoodCategoryDetails(router.query.id))
      }
  }, [dispatch, detailsSuccess, foodCategory, successUpdate,router.query.id]);

  const inputFormiks = {
    getFormErrorMessage,
    isFormFieldValid
  }

  return (
    <div id="edit_food_categories">
      <h1 id="editHeader">{i18n.t('update')}</h1>
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
            </InputGroup>
                  <InputContainer label="Resim" name="file" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                      setFile:(image)=>{ formik.values.image=image },
                      showSuccess:()=>{toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});}
                    }}/>
                    
                <InputContainer label={i18n.t('active')} name="active" noAutoCol12 formiks={inputFormiks} component={InputSwitch} iprops={{
                  value: formik.values.active,
                  checked: formik.values.active,
                  onChange: formik.handleChange
                }} />


                <S.SubmitBtn id="btnContainer">
                  <Button id="editBtn" type='submit' label={i18n.t('submit')}/>
                </S.SubmitBtn>

              </FormColumn>
              </div>
            </form>
          </S.ContainerCard>

    </div>
  );
};

export default FoodCategoryDataInput;
