import React, { useRef, useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser } from '../../../store/actions/userslists.action'
import { InputSwitch } from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { usersListTypes } from '../../../store/types/userslists.type'
import { Toast } from 'primereact/toast'
import { FormikProvider, useFormik } from 'formik'
import { i18n } from '../../../language'
import Loading from '../../Loading'
import FormColumn from '../../inputs/formColumn'
import { Dialog } from 'primereact/dialog';
import InputContainer from "../../inputs/inputContainer";
import InputGroup from "../../inputs/inputGroup";
import { Password } from 'primereact/password'
import auth from '../../../helpers/core/auth'
import SettingsService from '../../../store/services/settings.service'


const UserDataInput = (props) => {

    const toast = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch()

    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
    const changePasswordInput = useRef(null)
    const [changePasswordInputValue, setChangePasswordInputValue] = useState('')
    let settingsService = new SettingsService()

    const [loading, setLoading] = useState(true)
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name])
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
    }

    const formik = useFormik({
        initialValues: {
            name: "", email: "", phone: "", roles: [], active: false, address: props.updateProps ? '' : []
        },
        validate: (data) => {
            let errors: any = {}

            if (!data.name) {
                errors.name = i18n.t('isRequired', { input: i18n.t('userName') });;
            }
            if (!data.email) {
                errors.email = i18n.t('isRequired', { input: i18n.t('email') });;
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = i18n.t('invalidEmailMessage');
            }
            if (!data.phone) {
                errors.phone = i18n.t('isRequired', { input: i18n.t('phoneNumber') });;
            }
            if (!data.roles) {
                errors.roles = i18n.t('isRequired', { input: i18n.t('role') });;
            }
            if (!data.password && !props.updateProps) {
                errors.password = i18n.t('isRequired', { input: i18n.t('password') });;
            }
            return errors
        },
        onSubmit: (data: any) => {
            if (props.updateProps)
                dispatch(updateUser(router.query.id, data))
            else
                dispatch(addUser(data))
        }
    })

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }
    useEffect(() => {
        if (props.updateProps) {
            if (Object.keys(props.updateProps.data).length !== 0) {
                formik.values.name = props.updateProps.data.name
                formik.values.email = props.updateProps.data.email
                formik.values.roles = props.updateProps.data.roles
                formik.values.phone = props.updateProps.data.phone
                formik.values.iban_no = props.updateProps.data.iban_no
                formik.values.bank_name = props.updateProps.data.bank_name
                formik.values.active = props.updateProps.data.active
                setLoading(props.updateProps.loading)
            }
        } else {
            setLoading(false)
        }
    }, [props.updateProps?.data])


    useEffect(() => {
        if (props.updateProps)
            props.updateProps.setData(formik.values)
    }, [formik.values])

    let mySubmit = (data) => {
        formik.handleSubmit(data)
    }

    useEffect(() => {
        if (props.updateProps?.updateUserSuccess)
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('updatedUser') })
        else if (!props.updateProps?.updating && props.updateProps?.error)
            toast.current.show({ severity: 'warn', summary: i18n.t('error'), detail: 'Server: ' + props.updateProps.error });

    }, [props.updateProps?.updateUserSuccess, props.updateProps?.updating])

    const sendChangePasswordRequest = (newPassword) => {
        if (!auth.hasRoles(['admin'])) {
            toast.current.show({ severity: 'warn', summary: i18n.t('error'), detail: 'Unauthorized' });
            return
        }
        console.log(newPassword)
        settingsService.adminResetPassword(router.query.id, newPassword).then((res) => {
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('updatedPassword') })
            setChangePasswordModalOpen(false)
        }).catch((res) => {
            toast.current.show({ severity: 'warn', summary: i18n.t('error'), detail: i18n.t('updatePasswordFailed') });
        })
    }

    const changePasswordModalFooter = (
        <div>
            <Button style={{ float: 'left' }} className="p-button-info" label={i18n.t('update')} onClick={() => sendChangePasswordRequest(changePasswordInputValue)}></Button>
        </div>
    );

    const body = (updating) => {
        return (
            <div id='editUsers'>
                <h1 id='editHeader'>{updating ? i18n.t('updateUser') : i18n.t('createUser')}</h1>
                <form id='editForm' onSubmit={mySubmit} >
                    {
                        auth.hasRoles(['admin']) && updating &&
                        <Button type="button" label={i18n.t('changePassword')} className="p-button-outlined" onClick={() => setChangePasswordModalOpen(true)}></Button>
                    }
                    <div className="p-grid">
                        <FormColumn divideCount={2}>
                            <InputGroup>
                                <InputContainer label={i18n.t('selectRole')} size={6} name="roles" formiks={inputFormiks} component={MultiSelect} iprops={{
                                    value: formik.values.roles,
                                    onChange: formik.handleChange,
                                    options: usersListTypes.USER_ROLES_FOR_DROPDOWN,
                                    autoResize: true,
                                    placeholder: i18n.t('selectRole'),
                                    filter: true,
                                    filterBy: "label",
                                    optionLabel: "label",
                                    optionValue: "value"
                                }} />

                                <InputContainer label={i18n.t('name')} size={6} name="name" formiks={inputFormiks} component={InputText} iprops={{
                                    value: formik.values.name,
                                    onChange: formik.handleChange,

                                }} />

                                {!updating &&

                                    <InputContainer label={i18n.t('password')} name="password" size={6} formiks={inputFormiks} component={Password} iprops={{
                                        value: formik.values.password,
                                        onChange: formik.handleChange,
                                        toggleMask: true
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

                        {
                            formik.values.roles.includes('restaurant_owner') &&
                            <FormColumn divideCount={2}>
                                <InputGroup>
                                    <InputContainer label={i18n.t('iban')} size={6} name="iban_no" formiks={inputFormiks} component={InputText} iprops={{
                                        value: formik.values.iban_no,
                                        onChange: formik.handleChange,
                                        feedback: false
                                    }} />

                                    <InputContainer label={i18n.t('bankName')} size={6} name="bank_name" formiks={inputFormiks} component={InputText} iprops={{
                                        value: formik.values.bank_name,
                                        onChange: formik.handleChange,
                                        feedback: false
                                    }} />
                                </InputGroup>
                            </FormColumn>
                        }

                        <InputContainer label={i18n.t('active')} name="active" formiks={inputFormiks} component={InputSwitch} iprops={{
                            value: formik.values.active,
                            checked: formik.values.active,
                            onChange: formik.handleChange
                        }} />

                        {
                            auth.hasRoles(['admin']) &&
                            <Dialog header={i18n.t('updateUserPassword')} footer={changePasswordModalFooter} visible={changePasswordModalOpen} style={{ width: '50vw' }} onHide={() => setChangePasswordModalOpen(false)}>
                                <p>{i18n.t('enterANewPasswordForThisUser')}</p>
                                <Password
                                    value={changePasswordInputValue}
                                    ref={changePasswordInput}
                                    style={{ float: 'left' }}
                                    toggleMask={true}
                                    onChange={(e) => setChangePasswordInputValue(e.target.value)}
                                >
                                </Password>
                            </Dialog>
                        }
                        <Button id='submitBtn' type="submit" label={updating ? i18n.t('update') : i18n.t('create')}></Button>

                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>

            <Toast id='toastMessage' ref={toast}></Toast>
            {loading ? <Loading /> : (props.updateProps ? body(true) : body(false))}
        </div>
    )
}

export default (UserDataInput);
