import classNames from "classnames";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import InputContainer from "../../components/inputs/inputContainer";
import inputContainer from "../../components/inputs/inputContainer";
import InputGroup from "../../components/inputs/inputGroup";
import { i18n } from "../../language";
import { listAllUsers } from "../../store/actions/userslists.action";

const SendSms = () => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [userNames, setUserNames] = useState(null);

    const allUsersList = useSelector((state: RootState) => state.allUsersList);
    const { success, loading, users } = allUsersList;

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
            console.log("submitted: ", {
                message: formik.values.message,
                users: [...formik.values.users],
            });
        },
    });

    useEffect(() => {
        if (!success) {
            dispatch(listAllUsers());
        }
        if (success) {
            settingDropDownNames();
        }
    }, [success]);

    const settingDropDownNames = () => {
        const usersNames = users.items.map((user) => {
            return { name: user.name, id: user.id };
        });
        setUserNames(usersNames);
    };

    function multiSelect() {
        if (userNames != null)
            return (
                <InputGroup>
                    <InputContainer label={i18n.t('users')} name="users" formiks={inputFormiks} component={MultiSelect} iprops={{
                        value: formik.values.users,
                        display:"users",
                        options:userNames,
                        optionValue:"id",
                        optionLabel:"name",
                        onChange: formik.handleChange,
                        filter:true,
                        placeholder:"Select users",
                    }} />
                </InputGroup>
            );
    }

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }

    return (
        <>
            <h1>SMS Gönder</h1>
            <Toast ref={toast}></Toast>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid">
                    {multiSelect()}
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
            </form>
        </>
    );
};

export default SendSms;
