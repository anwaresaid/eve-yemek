import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RootState } from "typesafe-actions";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
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




const SmsGateWay = () => {
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
            otp_verification_on_registration: false,
            twilio_sid: "",
            twilio_access_token: "",
            twilio_service_id: "",
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
            formik.values.otp_verification_on_registration =
                settings.otp_verification_on_registration;
            formik.values.twilio_sid = settings.twilio_sid;
            formik.values.twilio_access_token = settings.twilio_access_token;
            formik.values.twilio_service_id = settings.twilio_service_id;
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
            <form id="generalSettingsForum" onSubmit={formik.handleSubmit}>
            <div className="p-grid">
                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="twilio_service_id"
                                            label="Twilio Service ID"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .twilio_service_id,
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
                                </FormColumn>

                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="twilio_sid"
                                            label="Twilio SID"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values.twilio_sid,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="twilio_access_token"
                                            label="Twilio Access Token"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .twilio_access_token,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>

                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="otp_verification_on_registration"
                                            label="OTP Verification on Registration"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputSwitch}
                                            iprops={{
                                                value: formik.values
                                                    .otp_verification_on_registration,
                                                onChange: formik.handleChange,
                                                checked:
                                                    formik.values
                                                        .otp_verification_on_registration,
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
export default SmsGateWay;