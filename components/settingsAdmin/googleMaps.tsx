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
    




const GoogleMaps =() =>{
    
        const dispatch = useDispatch();
        const toast = useRef(null);
        const router = useRouter();
        const res = useSelector((state: RootState) => state.listSettings);
        const { loading, success, settings } = res;
    
        const updateRes = useSelector((state: RootState) => state.updateSettings);
        const { success: successUpdate } = updateRes; 
    
        const formik = useFormik({
            initialValues: {
                google_api_key: "",

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

                formik.values.google_api_key = settings.google_api_key;
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

export default GoogleMaps;