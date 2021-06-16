import React, {useRef, useState, useEffect } from 'react'
import {InputText} from 'primereact/inputtext'
import {useRouter} from 'next/router'
import {useDispatch,useSelector} from 'react-redux'
import {addUser, updateUser} from '../../../store/actions/userslists.action'
import {InputSwitch} from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import {usersListTypes} from '../../../store/types/userslists.type'
import {Toast} from 'primereact/toast'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { i18n } from '../../../language'
import Loading from '../../Loading'
import FormColumn from '../../inputs/formColumn'
import InputContainer from "../../inputs/inputContainer";
import InputGroup from "../../inputs/inputGroup";
import { Password } from 'primereact/password'


const UserDataInput = (props) => {

    const toast = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name])
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
    }

    const formik = useFormik({
        initialValues: {
            name: "", email: "", phone: "", roles: [], address: props.updateProps ? '' : [] // amend when backend issue fixed
        },
        validate: (data)=>{
            let errors:any = {}

            if (!data.name) {
                errors.name = i18n.t('isRequired', {input: i18n.t('userName')});;
            }
            if (!data.email) {
                errors.email = i18n.t('isRequired', {input: i18n.t('email')});;
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = i18n.t('invalidEmailMessage');
            }
            if (!data.phone) {
                errors.phone = i18n.t('isRequired', {input: i18n.t('phoneNumber')});;
            }
            if (!data.roles) {
                errors.roles = i18n.t('isRequired', {input: i18n.t('role')});;
            }
            if (!data.password && !props.updateProps) {
                errors.password = i18n.t('isRequired', {input: i18n.t('password')});;
            }
            return errors
        },
        onSubmit: (data:any) => {
            if(props.updateProps)
                dispatch(updateUser(props.updateProps.id, data))
            else
                dispatch(addUser(data))
        }
    })

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
      }
    useEffect(() => {
        if (props.updateProps){
            if (Object.keys(props.updateProps.data).length !== 0){
                formik.values.name = props.updateProps.data.name
                formik.values.email = props.updateProps.data.email
                formik.values.roles = props.updateProps.data.roles
                formik.values.phone = props.updateProps.data.phone
                setLoading(props.updateProps.loading)
            }
        } else {
            setLoading(false)
        }
    }, [props.updateProps?.data])


    useEffect(()=>{
        if (props.updateProps)
            props.updateProps.setData(formik.values)
    }, [formik.values])

    let mySubmit = (data) => {
        formik.handleSubmit(data)
    }

    useEffect(()=>{
        if(props.updateProps?.updateUserSuccess){
            toast.current.show({severity: 'success', summary: i18n.t('success'), detail: i18n.t('updatedUser')})
            // dispatch({ type: usersListTypes.UPDATE_USER_RESET });
            // dispatch({ type: usersListTypes.GET_USER_RESET });
        }
        else if (!props.updateProps?.updating && props.updateProps?.error)
            toast.current.show({severity: 'warn', summary: i18n.t('error'), detail: 'Server: ' + props.updateProps.error});

    },[props.updateProps?.updateUserSuccess, props.updateProps?.updating])
    const body = (updating) => {
        return (
            <div id='editUsers'>
                <h1 id='editHeader'>{updating ? i18n.t('updateUser') : i18n.t('createUser')}</h1>
                <form id='editForm' onSubmit={mySubmit} >
                <div className="p-grid">
                    <FormColumn divideCount={2}>
                        {/* <div id='rolesDiv' className="p-field">
                            <h4 id='rolesHeader'>{i18n.t('role')}</h4>
                            <MultiSelect id="roles" value={formik.values.roles} placeholder={i18n.t('selectRole')} options={usersListTypes.USER_ROLES_FOR_DROPDOWN} onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid('roles') })}/>
                            <label id='errorRoles' htmlFor="roles" className={classNames({ 'p-error': isFormFieldValid('roles') })}></label>
                            {getFormErrorMessage('roles')}
                        </div> */}
                        <InputGroup>
                            <InputContainer label={i18n.t('selectRole')} size={6} name="roles" formiks={inputFormiks} component={MultiSelect} iprops={{
                                value: formik.values.roles,
                                onChange: formik.handleChange,
                                options: usersListTypes.USER_ROLES_FOR_DROPDOWN,
                                autoResize: true,
                                placeholder: i18n.t('selectRole'),
                                filter:true,
                                filterBy:"label",
                                optionLabel: "label",
                                optionValue:"value"
                            }} />
                        {/* <div id='nameDiv' className="p-field">
                            <h4 id='nameHeader'>{i18n.t('name')}</h4>
                            <InputText id="name" name='name' value={formik.values.name} type="text" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                            <label id='errorName' htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div> */}
                                <InputContainer label={i18n.t('name')} size={6} name="name" formiks={inputFormiks} component={InputText} iprops={{
                                    value: formik.values.name,
                                    onChange: formik.handleChange,

                                }} />
                          
                            {/* <div id='emailDiv' className="p-field">
                                <h4 id='emailHeader'>{i18n.t('email')}</h4>
                                <InputText id="email" value={formik.values.email} type="text" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })}/>
                                <label id='errorEmail' htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}></label>
                                {getFormErrorMessage('email')}
                            </div> */}
                            {!updating &&
                           
                            <InputContainer label={i18n.t('password')} name="password" size={6}  formiks={inputFormiks} component={Password } iprops={{
                                value: formik.values.password,
                                onChange: formik.handleChange,
                                toggleMask:true
                            }} />
                            }
                            </InputGroup>
                            </FormColumn>
                            <FormColumn divideCount={2}>
                            <InputGroup>
                                <InputContainer label={i18n.t('email')} size={6} name="email" formiks={inputFormiks} component={InputText} iprops={{
                                value: formik.values.email,
                                onChange: formik.handleChange,
                            }} />

                            <InputContainer label={i18n.t('telephone')} size={6} name="phone" formiks={inputFormiks} component={InputText} iprops={{
                                value: formik.values.phone,
                                onChange: formik.handleChange,
                            }} />
                            </InputGroup>
                            </FormColumn>
                        
                        {/* <div id='activeDiv' className="p-field">
                            <h4 id='activeHeader'>{i18n.t('active')}</h4>
                            <InputSwitch id="active " name="active"  checked={true} onChange={formik.handleChange} ></InputSwitch>
                            <label id='errorActive' htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                            {getFormErrorMessage('active')}
                        </div> */}
                        <FormColumn divideCount={2}>

                         <InputContainer label={i18n.t('active')} name="active"  formiks={inputFormiks} component={InputSwitch} iprops={{
                             value: formik.values.active,
                             checked: formik.values.active,
                             onChange: formik.handleChange
                            }} />
                            <Button id='submitBtn' type="submit" label={updating ? i18n.t('update'): i18n.t('create')}></Button>
                            </FormColumn>
                    </div>
                </form>
            </div>
        )
    }
    
    console.log(usersListTypes.USER_ROLES_FOR_DROPDOWN);
    return (
        <div>

            <Toast id='toastMessage' ref={toast}></Toast>
            {loading ? <Loading/> : (props.updateProps ? body(true) : body(false))}
        </div>
    )
}

export default (UserDataInput);
