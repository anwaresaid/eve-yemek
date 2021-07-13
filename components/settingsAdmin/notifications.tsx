import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RootState } from "typesafe-actions";
import { InputText } from "primereact/inputtext";
import { i18n } from "../../language";
import {
    listSettings,
    updateSettings,
} from "../../store/actions/settings.action";
import { settingsTypes } from "../../store/types/settings.type";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import InputContainer from "../inputs/inputContainer";
import FormColumn from "../inputs/formColumn";
import InputGroup from "../inputs/inputGroup";





const Notification =() =>{
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dataSetted, setDataSetted] = useState(false);
    const router = useRouter();
    const res = useSelector((state: RootState) => state.listSettings);
    const { loading, success, settings } = res;

    const updateRes = useSelector((state: RootState) => state.updateSettings);
    const { success: successUpdate } = updateRes; 

    const formik = useFormik({
        initialValues: {
            fcm_project_id: "",
            fcm_app_id: "",
            fcm_sender_id: "",
            fcm_web_certificate: "",
            fcm_web_api_key: "",
            fcm_web_server_key: "",
        },
        validate: (data) => {
            let errors: any = {};
            console.log(errors);
            return errors;
        },
        onSubmit: (data: any) => {
            dispatch(updateSettings({...data, is_active:true}));
            dispatch({ type: settingsTypes.SETTINGS_UPDATE_RESET });
        },
    });

    const isFormFieldValid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error">{formik.errors[name]}</small>
            )
        );
    };

    useEffect(() => {
        if (success && settings) {
            formik.values.fcm_project_id = settings.fcm_project_id;
            formik.values.fcm_app_id = settings.fcm_app_id;
            formik.values.fcm_sender_id = settings.fcm_sender_id;
            formik.values.fcm_web_certificate = settings.fcm_web_certificate;
            formik.values.fcm_web_api_key = settings.fcm_web_api_key;
            formik.values.fcm_web_server_key = settings.fcm_web_server_key;

            setDataSetted(true);
        } else {
            dispatch(listSettings());
        }
    }, [dispatch, success]);

    useEffect(()=>{
        if (successUpdate) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Settings Updated Successfully",
            });
        }
    }, [successUpdate]);
    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid,
    };

    return(
        <div>
             <Toast id="toastMessage" ref={toast}></Toast>
            <form id="NotificationSettingForm" onSubmit={formik.handleSubmit}>
            <div className="p-grid">
                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="fcm_project_id"
                                            label="FCM Project ID"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .fcm_project_id,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="fcm_app_id"
                                            label="FCM APP ID"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values.fcm_app_id,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>

                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="fcm_sender_id"
                                            label="FCM Sender ID"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .fcm_sender_id,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="fcm_web_certificate"
                                            label="FCM Web Certificate"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .fcm_web_certificate,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>

                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="fcm_web_api_key"
                                            label="FCM Web API Key"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .fcm_web_api_key,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="fcm_web_server_key"
                                            label="FCM Server Key"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .fcm_web_server_key,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                    <Button
                                        id="createBtn"
                                        className="p-mt-3"
                                        type="submit"
                                        label={i18n.t("submit")}
                                    />
                                </FormColumn>
                            </div>
            </form>
    </div>
    )
}
export default Notification;