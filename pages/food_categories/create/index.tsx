import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import * as S from "../../../styles/food/create-food/food.create.style";
import { InputSwitch } from "primereact/inputswitch";
import { createFoodCategory } from "../../../store/actions/foodCategory.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { foodCategoryTypes } from "../../../store/types/foodCategory.type";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { i18n } from "../../../language";
import InputContainer from "../../../components/inputs/inputContainer";
import StandardFileUpload from "../../../components/inputs/fileUpload";
import FormColumn from "../../../components/inputs/formColumn";
import InputGroup from "../../../components/inputs/inputGroup";
import { Dropdown } from "primereact/dropdown";
import { getSupportedCountries } from "../../../store/actions/addresses.action";
import { ProgressSpinner } from "primereact/progressspinner";
import BackBtn from "../../../components/backBtn";
import auth from '../../../helpers/core/auth';

export const Index = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useRef(null);
    const foodCategoryCreate = useSelector(
        (state: RootState) => state.createFoodCategory
    );
    const { success } = foodCategoryCreate;
    const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
    const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

    const isFormFieldValid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error">{formik.errors[name]}</small>
            )
        );
    };

    const defaultInitialValues = {
        name: '',
        image: '',
        country: '',
        active: false,
    }

    const formik = useFormik({
        initialValues: defaultInitialValues,
        validate: (data) => {
            let errors: any = {};

            if (!data.name) {
                errors.name = i18n.t("isRequired", {
                    input: i18n.t("mealCategory"),
                });
            }

            if (!data.country) {
                errors.country = i18n.t("isRequired", {
                    input: i18n.t("country"),
                });
            }

            return errors;
        },
        onSubmit: (data: any) => {
            // setFormData(data);
            // setShowMessage(true);
            dispatch(createFoodCategory(data));
        },
    });

    useEffect(() => {
        if (success) {
            clearAllInputs()
            toast.current.show({
                severity: "success",
                summary: i18n.t("success"),
                detail: i18n.t("createdMealCategory"),
            });
            dispatch({ type: foodCategoryTypes.FOOD_CATEGORY_CREATE_RESET });
        }
    }, [success]);

    useEffect(() => {
        if (!supportedCountries) {
            dispatch(getSupportedCountries())
        }
    }, []);

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid,
    };

    const clearAllInputs = () => {
        Object.keys(formik.values).map(k => {
            formik.values[k] = defaultInitialValues[k]
        })
    }

    return (
        auth.user.roles == 'admin' || auth.user.roles == 'super_admin' ?
            <div id="edit_food_categories">
                <BackBtn router={router} />
                <h1 id="editHeader">{i18n.t("createFoodCategory")}</h1>
                <Toast id="toastMessage" ref={toast}></Toast>
                <S.ContainerCard id="container">
                    <form id="editForm" onSubmit={formik.handleSubmit}>
                        <div className="p-grid">
                            <FormColumn divideCount={3}>
                                <InputGroup>
                                    <InputContainer
                                        label={i18n.t("name")}
                                        name="name"
                                        formiks={inputFormiks}
                                        component={InputText}
                                        size={8}
                                        iprops={{
                                            value: formik.values.name,
                                            onChange: formik.handleChange,
                                        }}
                                    />
                                    {supportedCountriesLoading && <ProgressSpinner />}
                                    {supportedCountriesSuccess &&

                                        <InputContainer label={i18n.t('country')} name="country" formiks={inputFormiks} size={4} component={Dropdown} iprops={{
                                            value: formik.values.country,
                                            onChange: formik.handleChange,
                                            options: Object.keys(supportedCountries).map((key) => { return { label: supportedCountries[key].english_name, value: key } })
                                        }} />


                                    }
                                </InputGroup>
                                <InputGroup>
                                    <InputContainer
                                        label={i18n.t("image")}
                                        name="image"
                                        formiks={inputFormiks}
                                        component={StandardFileUpload}
                                        iprops={{
                                            setFile: (image) => {
                                                formik.values.image = image;
                                            },
                                            showSuccess: () => {
                                                toast.current.show({
                                                    severity: "info",
                                                    summary: i18n.t("success"),
                                                    detail: i18n.t("fileUploaded"),
                                                });
                                            },
                                        }}
                                    />

                                    <InputContainer
                                        label={i18n.t("active")}
                                        name="active"
                                        noAutoCol12
                                        formiks={inputFormiks}
                                        component={InputSwitch}
                                        iprops={{
                                            value: formik.values.active,
                                            checked: formik.values.active,
                                            onChange: formik.handleChange,
                                        }}
                                    />
                                </InputGroup>
                                <S.SubmitBtn id="btnContainer">
                                    <Button
                                        id="editBtn"
                                        type="submit"
                                        label={i18n.t("submit")}
                                    />
                                </S.SubmitBtn>
                            </FormColumn>
                        </div>
                    </form>
                </S.ContainerCard>
            </div> : <></>
    );
};

export default Index;
