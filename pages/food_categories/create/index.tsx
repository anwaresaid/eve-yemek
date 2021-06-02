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

export const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
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


  const onTemplateSelect = (e: any) => {
    let _totalSize = totalSize;
    // e.files.map(file => {
    //     _totalSize += file.size;
    // });
    for (let i = 0; i < e.files.length; i++) {
      _totalSize += e.files[i].size;
    }
    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    formik.values.image = e.files[0]?.objectURL;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: 'info',
      summary: i18n.t('success'),
      detail: i18n.t('fileUploaded'),
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 20000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B';

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 2 MB`}
          style={{ width: '300px', height: '20px', marginLeft: 'auto' }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className='p-d-flex p-ai-center p-flex-wrap'>
        <div className='p-d-flex p-ai-center' style={{ width: '40%' }}>
          <img
            alt={file.name}
            role='presentation'
            src={file.objectURL}
            width={100}
          />
          <span className='p-d-flex p-dir-col p-text-left p-ml-3'>
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity='warning'
          className='p-px-3 p-py-2'
        />
        <Button
          type='button'
          icon='pi pi-times'
          className='p-button-outlined p-button-rounded p-button-danger p-ml-auto'
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className='p-d-flex p-ai-center p-dir-col'>
        <i
          className='pi pi-image p-mt-3 p-p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className='p-my-5'
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };

  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };

  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };
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
          <FileUpload
            ref={fileUploadRef}
            name='image'
            url='./'
            multiple
            accept='image/*'
            maxFileSize={1000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            className={classNames({ 'p-invalid': isFormFieldValid('image') })}
          />
           <label htmlFor="image" className={classNames({ 'p-error': isFormFieldValid('image') })}></label>
          {getFormErrorMessage('image')}

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
