import classNames from "classnames";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import InputContainer from "../../components/inputs/inputContainer";
import inputContainer from "../../components/inputs/inputContainer";
import InputGroup from "../../components/inputs/inputGroup";
import Loading from "../../components/Loading";
import { i18n } from "../../language";
import { getSupportedCountries } from "../../store/actions/addresses.action";
import { sendSms } from "../../store/actions/send_sms";
import { listAllUsers } from "../../store/actions/userslists.action";
import UsersListsService from "../../store/services/userslists.service";

const SendSms = () => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [userNames, setUserNames] = useState(null);

    const allUsersList = useSelector((state: RootState) => state.allUsersList);
    const { success: allUsersListSuccess, loading: allUsersListLoading, users: allUsersListUsers } = allUsersList;

    const sendSmsState = useSelector((state: RootState) => state.sendSms);
    const { loading: sendSmsStateLoading, success: sendSmsSuccess, error: sendSmsError } = sendSmsState;

    const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
    const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [loadingUsers, setLoadingUsers] = useState(true)

    const userListsService = new UsersListsService();

    const roleOptions = [
        { label: i18n.t('admins'), value: 'admin' },
        { label: i18n.t('restaurantOwners'), value: 'restaurant_owner' },
        { label: i18n.t('customers'), value: 'customer' },
        { label: i18n.t('customerServiceReps'), value: 'customer_service' },
        { label: i18n.t('deliveryScouts'), value: 'delivery_scout' },
        { label: i18n.t('all'), value: '' }
    ]

    const isFormFieldValid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error">{formik.errors[name]}</small>
            )
        );
    };
    const formik = useFormik({
        initialValues: {
            users: [],
            message: "",
        },
        validateOnChange: false,
        validate: (data) => {
            let errors: any = {};

            if (data?.users && data?.users?.length < 1) {
                errors.users = i18n.t('isRequired', { input: i18n.t('users') });
            }

            if (!data.message) {
                errors.message = i18n.t('isRequired', { input: i18n.t('message') });
            }

            return errors;
        },
        onSubmit: (data: any) => {
            if (sendSmsStateLoading !== true) {
                dispatch(sendSms([...formik.values.users], formik.values.message));
            }
        },
    });

    useEffect(() => {
        if (!supportedCountries) {
            dispatch(getSupportedCountries())
        }
        if (!allUsersListSuccess) {
            dispatch(listAllUsers());
        }
        if (allUsersListSuccess) {
            settingDropDownNames();
        }
    }, [allUsersListSuccess, dispatch]);

    useEffect(() => {
        if (sendSmsStateLoading === false) {
            if (sendSmsSuccess) {
                toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('success') });
                formik.values.users = [];
                formik.values.message = "";
            } else if (sendSmsError) {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('error') });
            }
        }
    }, [sendSmsError, sendSmsSuccess, sendSmsStateLoading]);

    const settingDropDownNames = () => {
        const usersNames = allUsersListUsers.items.map((user) => {
            return { name: user.name, id: user.id };
        });
        setUserNames(usersNames);
        setLoadingUsers(false)
    };

    function selectCountry(country) {
        setSelectedCountry(country)
        setLoadingUsers(true)
        setUserNames([])
        userListsService.getUsersByCountryAndRole(country, selectedRole).then((res) => {
            setUserNames(res.map((user) => { return { name: user.name, id: user.id } }))
            setLoadingUsers(false)
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('couldNotGetUsersBasedOnYourSelection') });
            setLoadingUsers(false)
        })
    }

    function selectRole(role) {
        setSelectedRole(role)
        setLoadingUsers(true)
        setUserNames([])
        userListsService.getUsersByCountryAndRole(selectedCountry, role).then((res) => {
            setUserNames(res.map((user) => { return { name: user.name, id: user.id } }))
            setLoadingUsers(false)
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('couldNotGetUsersBasedOnYourSelection') });
            setLoadingUsers(false)
        })
    }

    function userSelectionInputs() {
        if (userNames != null) {
            return (
                <InputGroup>
                    <InputContainer label={i18n.t('country')} name="country" size={4} component={Dropdown} formiks={inputFormiks} iprops={{
                        options: (() => { let opt = [{ label: i18n.t('all'), value: '' }]; (Object.keys(supportedCountries).map((key) => { opt.push({ label: supportedCountries[key].native_name, value: key }) })); return opt })(),
                        value: selectedCountry,
                        onChange: (e) => selectCountry(e.target.value)
                    }} />
                    <InputContainer label={i18n.t('role')} name="role" size={4} component={Dropdown} formiks={inputFormiks} iprops={{
                        options: roleOptions,
                        value: selectedRole,
                        onChange: (e) => selectRole(e.target.value)
                    }} />
                    {
                        loadingUsers ? <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} /> :
                            <InputContainer label={i18n.t('users')} name="users" size={4} formiks={inputFormiks} component={MultiSelect} iprops={{
                                value: formik.values.users,
                                display: "users",
                                options: userNames,
                                optionValue: "id",
                                optionLabel: "name",
                                onChange: formik.handleChange,
                                filter: true,
                                placeholder: i18n.t("users"),
                            }} />
                    }
                </InputGroup>
            );
        } else {
            return <ProgressSpinner />
        }
    }

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }

    return (
        <>
            <h1>{i18n.t("sendSms")}</h1>
            <Toast ref={toast}></Toast>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid">
                    {userSelectionInputs()}
                    <InputGroup>
                        <InputContainer label={i18n.t('message')} name="message" formiks={inputFormiks} component={InputTextarea} iprops={{
                            value: formik.values.message,
                            onChange: formik.handleChange,
                            rows: 3,
                            autoResize: true
                        }} />
                    </InputGroup>
                </div>
                <Button type="submit" label={i18n.t("submit")} />
                {
                    sendSmsStateLoading && <div><ProgressSpinner /></div>
                }
            </form>
        </>
    );
};

export default SendSms;
