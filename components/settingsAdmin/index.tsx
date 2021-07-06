import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RootState } from "typesafe-actions";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { i18n } from "../../language";
import { InputNumber } from "primereact/inputnumber";
import {
    listSettings,
    updateSettings,
} from "../../store/actions/settings.action";
import { settingsTypes } from "../../store/types/settings.type";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import InputContainer from "../inputs/inputContainer";
import FormColumn from "../inputs/formColumn";
import InputGroup from "../inputs/inputGroup";

const SettingsAdmin = () => {
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
            app_name: "",
            time_zone: "",
            currency_code: "",
            currency_symbol: "",
            is_taxed: false,
            tax_rate: 0,
            is_delivery_charged: false,
            delivery_charge: 0,
            fcm_project_id: "",
            fcm_app_id: "",
            fcm_sender_id: "",
            fcm_web_certificate: "",
            fcm_web_api_key: "",
            fcm_web_server_key: "",
            otp_verification_on_registration: false,
            twilio_sid: "",
            twilio_access_token: "",
            twilio_service_id: "",
            google_api_key: "",
            is_cod_active: false,
            is_paypal_active: false,
            paypal_api_key: "",
            is_razorpay_active: false,
            razorpay_client_key: "",
            razorpay_secret_key: "",
        },
        validate: (data) => {
            let errors: any = {};

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
            formik.values.app_name = settings.app_name;
            formik.values.time_zone = settings.time_zone;
            formik.values.currency_code = settings.currency_code;
            formik.values.currency_symbol = settings.currency_symbol;
            formik.values.is_taxed = settings.is_taxed;
            formik.values.tax_rate = settings.tax_rate;
            formik.values.is_delivery_charged = settings.is_delivery_charged;
            formik.values.delivery_charge = settings.delivery_charge;

            formik.values.fcm_project_id = settings.fcm_project_id;
            formik.values.fcm_app_id = settings.fcm_app_id;
            formik.values.fcm_sender_id = settings.fcm_sender_id;
            formik.values.fcm_web_certificate = settings.fcm_web_certificate;
            formik.values.fcm_web_api_key = settings.fcm_web_api_key;
            formik.values.fcm_web_server_key = settings.fcm_web_server_key;

            formik.values.otp_verification_on_registration =
                settings.otp_verification_on_registration;
            formik.values.twilio_sid = settings.twilio_sid;
            formik.values.twilio_access_token = settings.twilio_access_token;
            formik.values.twilio_service_id = settings.twilio_service_id;

            formik.values.google_api_key = settings.google_api_key;

            formik.values.is_cod_active = settings.is_cod_active;
            formik.values.is_paypal_active = settings.is_paypal_active;
            formik.values.paypal_api_key = settings.paypal_api_key;
            formik.values.is_razorpay_active = settings.is_razorpay_active;
            formik.values.razorpay_client_key = settings.razorpay_client_key;
            formik.values.razorpay_secret_key = settings.razorpay_secret_key;
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

    return (
        <div id="settingsRenderDiv">
            <Toast id="toastMessage" ref={toast}></Toast>
            {loading && dataSetted ? (
                <h2 id="LoadingHeader">Loading</h2>
            ) : (
                <form id="settingsForum" onSubmit={formik.handleSubmit}>
                    <TabView
                        id="tabPanelSettings"
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel header={i18n.t("general")}>
                            <div className="p-grid">
                                <FormColumn divideCount={2}>
                                    <InputGroup>
                                        <InputContainer
                                            name="app_name"
                                            label={i18n.t("applicationName")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values.app_name,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="time_zoneHeader"
                                            label={i18n.t("timeZone")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values.time_zone,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                                <FormColumn divideCount={2}>
                                    <InputGroup>
                                        <InputContainer
                                            name="currency_code"
                                            label={i18n.t("currencyCode")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .currency_code,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="currency_symbol"
                                            label={i18n.t("currencySymbol")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .currency_symbol,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                                <FormColumn divideCount={2}>
                                    <InputGroup>
                                        <InputContainer
                                            name="is_taxed"
                                            label={i18n.t("taxApplicable")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputSwitch}
                                            iprops={{
                                                value: formik.values.is_taxed,
                                                checked: formik.values.is_taxed,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="tax_rate"
                                            label={i18n.t("taxPercentage")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputNumber}
                                            iprops={{
                                                value: formik.values.tax_rate,
                                                disabled: formik.values.is_taxed
                                                    ? false
                                                    : true,
                                                onValueChange:
                                                    formik.handleChange,
                                                showButtons: true,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                                <FormColumn divideCount={2}>
                                    <InputGroup>
                                        <InputContainer
                                            name="is_delivery_charged"
                                            label={i18n.t(
                                                "deliveryFeeApplicable"
                                            )}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputSwitch}
                                            iprops={{
                                                value: formik.values
                                                    .is_delivery_charged,
                                                checked:
                                                    formik.values
                                                        .is_delivery_charged,
                                                onChange: formik.handleChange,
                                            }}
                                        />

                                        <InputContainer
                                            name="tax_rate"
                                            label={i18n.t("deliveryFee")}
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputNumber}
                                            iprops={{
                                                value: formik.values
                                                    .delivery_charge,
                                                disabled: formik.values
                                                    .is_delivery_charged
                                                    ? false
                                                    : true,
                                                onValueChange:
                                                    formik.handleChange,
                                                showButtons: true,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="languageSelect"
                                            label={i18n.t("selectLanguage")}
                                            noErrorLabel={true}
                                            size={3}
                                            component={Dropdown}
                                            iprops={{
                                                value: i18n.language,
                                                options: [
                                                    {
                                                        value: "en",
                                                        label: "English",
                                                    },
                                                    {
                                                        value: "ar",
                                                        label: "اَلْعَرَبِيَّةُ",
                                                    },
                                                    {
                                                        value: "ru",
                                                        label: "Русский ",
                                                    },
                                                    {
                                                        value: "tr",
                                                        label: "Türkçe",
                                                    },
                                                ],
                                                onChange: (e) => {
                                                    i18n.changeLanguage(
                                                        e.value
                                                    );
                                                    router.reload();
                                                },
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                            </div>
                        </TabPanel>
                        <TabPanel header={i18n.t("notifications")}>
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
                                </FormColumn>
                            </div>
                        </TabPanel>
                        <TabPanel header={i18n.t("smsGateway")}>
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
                                </FormColumn>
                            </div>
                        </TabPanel>
                        <TabPanel header={i18n.t("googleMaps")}>
                            <div className="p-grid">
                                <FormColumn>
                                    <InputGroup>
                                        <InputContainer
                                            name="google_api_key"
                                            label="Google API Key"
                                            formiks={inputFormiks}
                                            size={6}
                                            component={InputText}
                                            iprops={{
                                                value: formik.values
                                                    .google_api_key,
                                                onChange: formik.handleChange,
                                            }}
                                        />
                                    </InputGroup>
                                </FormColumn>
                            </div>
                        </TabPanel>
                        <TabPanel header={i18n.t("paymentGateway")}>
                            <div id="is_cod_activeDiv" className="p-field">
                                <h4 id="is_cod_activeHeader">COD Ative</h4>
                                <InputSwitch
                                    id="is_cod_active "
                                    name="is_cod_active"
                                    checked={formik.values.is_cod_active}
                                    onChange={formik.handleChange}
                                ></InputSwitch>
                                <label
                                    id="errorIs_cod_active"
                                    htmlFor="is_cod_active"
                                    className={classNames({
                                        "p-error":
                                            isFormFieldValid("is_cod_active"),
                                    })}
                                ></label>
                                {getFormErrorMessage("is_cod_active")}
                            </div>
                            <div id="is_paypal_activeDiv">
                                <h4 id="is_paypal_activeDiv">Paypal Active</h4>
                                <InputSwitch
                                    id="is_paypal_active "
                                    name="is_paypal_active"
                                    checked={formik.values.is_paypal_active}
                                    onChange={formik.handleChange}
                                ></InputSwitch>
                                <label
                                    id="errorIs_paypal_active"
                                    htmlFor="is_paypal_active"
                                    className={classNames({
                                        "p-error":
                                            isFormFieldValid(
                                                "is_paypal_active"
                                            ),
                                    })}
                                ></label>
                                {getFormErrorMessage("is_paypal_active")}
                            </div>
                            <div id="paypal_api_keyDiv" className="p-field">
                                <h4 id="paypal_api_keyHeader">
                                    Paypal API Key
                                </h4>
                                <InputText
                                    disabled={
                                        formik.values.is_paypal_active
                                            ? false
                                            : true
                                    }
                                    id="paypal_api_key"
                                    value={formik.values.paypal_api_key}
                                    type="text"
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid":
                                            isFormFieldValid("paypal_api_key"),
                                    })}
                                />
                                <label
                                    id="errorPaypal_api_key"
                                    htmlFor="paypal_api_key"
                                    className={classNames({
                                        "p-error":
                                            isFormFieldValid("paypal_api_key"),
                                    })}
                                ></label>
                                {getFormErrorMessage("paypal_api_key")}
                            </div>
                            <div id="is_razorpay_activeDiv ">
                                <h4 id="is_razorpay_activHeader ">
                                    RazorPay Active
                                </h4>
                                <InputSwitch
                                    id="is_razorpay_active "
                                    name="is_razorpay_active"
                                    checked={formik.values.is_razorpay_active}
                                    onChange={formik.handleChange}
                                ></InputSwitch>
                                <label
                                    id="errorIs_razorpay_active "
                                    htmlFor="is_razorpay_active"
                                    className={classNames({
                                        "p-error":
                                            isFormFieldValid(
                                                "is_razorpay_active"
                                            ),
                                    })}
                                ></label>
                                {getFormErrorMessage("is_razorpay_active")}
                            </div>
                            <div
                                id="razorpay_client_keyDiv"
                                className="p-field"
                            >
                                <h4 id="razorpay_client_keyHeader">
                                    Razorpay Client Key
                                </h4>
                                <InputText
                                    disabled={
                                        formik.values.is_razorpay_active
                                            ? false
                                            : true
                                    }
                                    id="razorpay_client_key"
                                    value={formik.values.razorpay_client_key}
                                    type="text"
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid(
                                            "razorpay_client_key"
                                        ),
                                    })}
                                />
                                <label
                                    id="errorRazorpay_client_key"
                                    htmlFor="razorpay_client_key"
                                    className={classNames({
                                        "p-error": isFormFieldValid(
                                            "razorpay_client_key"
                                        ),
                                    })}
                                ></label>
                                {getFormErrorMessage("razorpay_client_key")}
                            </div>
                            <div
                                id="razorpay_secret_keyDiv"
                                className="p-field"
                            >
                                <h4 id="razorpay_secret_keyHeader">
                                    Razorpay Secret Key
                                </h4>
                                <InputText
                                    disabled={
                                        formik.values.is_razorpay_active
                                            ? false
                                            : true
                                    }
                                    id="razorpay_secret_key"
                                    value={formik.values.razorpay_secret_key}
                                    type="text"
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid(
                                            "razorpay_secret_key"
                                        ),
                                    })}
                                />
                                <label
                                    id="errorRazorpay_secret_key"
                                    htmlFor="razorpay_secret_key"
                                    className={classNames({
                                        "p-error": isFormFieldValid(
                                            "razorpay_secret_key"
                                        ),
                                    })}
                                ></label>
                                {getFormErrorMessage("razorpay_secret_key")}
                            </div>
                        </TabPanel>
                    </TabView>
                    <Button
                        id="createBtn"
                        className="p-mt-3"
                        type="submit"
                        label={i18n.t("submit")}
                    />
                </form>
            )}
        </div>
    );
};

export default SettingsAdmin;
