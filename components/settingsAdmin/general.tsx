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





const General=() => {
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
            formik.values.app_name = settings.app_name;
            formik.values.time_zone = settings.time_zone;
            formik.values.currency_code = settings.currency_code;
            formik.values.currency_symbol = settings.currency_symbol;
            formik.values.is_taxed = settings.is_taxed;
            formik.values.tax_rate = settings.tax_rate;
            formik.values.is_delivery_charged = settings.is_delivery_charged;
            formik.values.delivery_charge = settings.delivery_charge;
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
            <form id="generalSettingsForum" onSubmit={formik.handleSubmit}>
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
                <Button
                        id="createBtn"
                        className="p-mt-3"
                        type="submit"
                        label={i18n.t("submit")}
                    />
            </FormColumn>
            </form>
    </div>
    )
}
export default General;