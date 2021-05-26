import React, {useRef, useState, useEffect } from 'react'
import {InputText} from 'primereact/inputtext'
import {useRouter} from 'next/router'
import {useDispatch,useSelector} from 'react-redux'
import {addUser, updateUser} from '../../store/actions/userslists.action'
import {InputSwitch} from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { ProgressSpinner } from 'primereact/progressspinner'
import {usersListTypes} from '../../store/types/userslists.type'
import {Toast} from 'primereact/toast'
import { useFormik } from 'formik'
import classNames from 'classnames'

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
                errors.name = 'user name is required.';
            }
            if (!data.email) {
                errors.email = 'email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }
            if (!data.phone) {
                errors.phone = 'Phone Number is required.';
            }
            if (!data.roles) {
                errors.roles = 'roles is required.';
            }
            if (!data.password && !props.updateProps) {
                errors.password = 'password is required.';
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
        if(props.updateProps?.updateUserSuccess)
            toast.current.show({severity: 'success', summary: 'Updated User', detail: 'Updated user '})
        else if (!props.updateProps?.updating && props.updateProps?.error)
            toast.current.show({severity: 'warn', summary: 'Error', detail: 'Server: ' + props.updateProps.error});

    },[props.updateProps?.updateUserSuccess, props.updateProps?.updating])
    const body = (updating) => {
        return (
            <div>
                <h1>{updating ? "Kullanıcı Düzenle" : "Kullanıcı Oluştur"}</h1>
                <form onSubmit={mySubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>Rol</h4>
                            <MultiSelect id="roles" value={formik.values.roles} placeholder="Rol seçin" options={usersListTypes.USER_ROLES_FOR_DROPDOWN} onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid('roles') })}/>
                            <label htmlFor="roles" className={classNames({ 'p-error': isFormFieldValid('roles') })}></label>
                            {getFormErrorMessage('roles')}
                        </div>
                        <div className="p-field">
                            <h4>Ad</h4>
                            <InputText id="name" name='name' value={formik.values.name} type="text" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}></label>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="p-field">
                            <h4>E-Posta</h4>
                            <InputText id="email" value={formik.values.email} type="text" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })}/>
                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}></label>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="p-field">
                            <h4>Telefon</h4>
                            <InputText id="phone" value={formik.values.phone} type="text" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('phone') })}/>
                            <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid('phone') })}></label>
                            {getFormErrorMessage('phone')}
                        </div>
                        {!updating &&
                            <div className="p-field">
                            <h4>Şifre</h4>
                            <InputText id="password" type="password" value={formik.values.password} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('password') })}></InputText>
                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}></label>
                            {getFormErrorMessage('password')}
                        </div>
                        }
                        <div className="p-field">
                            <h4>Aktif</h4>
                            <InputSwitch id="active " name="active"  checked={true} onChange={formik.handleChange} ></InputSwitch>
                            <label htmlFor="active" className={classNames({ 'p-error': isFormFieldValid('active') })}></label>
                            {getFormErrorMessage('active')}
                        </div>
                    </div>
                    <Button type="submit" label={updating ? "Düzenle" : "Oluştur"}></Button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            {loading ? <ProgressSpinner/> : (props.updateProps ? body(true) : body(false))}
        </div>
    )
}

export default (UserDataInput);
