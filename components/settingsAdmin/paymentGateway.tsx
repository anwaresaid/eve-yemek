import { useRouter } from "next/router";
    import React, { useEffect, useRef } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useFormik } from "formik";
    import { RootState } from "typesafe-actions";
    import classNames from "classnames";
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




const PaymentGateway =() =>{
    
        const dispatch = useDispatch();
        const toast = useRef(null);
        const router = useRouter();
        const res = useSelector((state: RootState) => state.listSettings);
        const { loading, success, settings } = res;
    
        const updateRes = useSelector((state: RootState) => state.updateSettings);
        const { success: successUpdate } = updateRes; 
    
        const formik = useFormik({
            initialValues: {
                is_cod_active: false,
                is_paypal_active: false,
                paypal_api_key: "",
                is_razorpay_active: false,
                razorpay_client_key: "",
                razorpay_secret_key: "",

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

                formik.values.is_cod_active = settings.is_cod_active;
                formik.values.is_paypal_active = settings.is_paypal_active;
                formik.values.paypal_api_key = settings.paypal_api_key;
                formik.values.is_razorpay_active = settings.is_razorpay_active;
                formik.values.razorpay_client_key = settings.razorpay_client_key;
                formik.values.razorpay_secret_key = settings.razorpay_secret_key;            } else {
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

                                <Button
                                        id="createBtn"
                                        className="p-mt-3"
                                        type="submit"
                                        label={i18n.t("submit")}
                                    />
                            </div>
                </form>
        </div>
        )
    
    
    }

export default PaymentGateway;