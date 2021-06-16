import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import auth from "../../helpers/core/auth";
import { i18n } from "../../language";
import { changePassword } from "../../store/actions/user.action";
import FormColumn from "../inputs/formColumn";
import InputContainer from "../inputs/inputContainer";
import InputGroup from "../inputs/inputGroup";

const SettingsOwner = () => {

    const dispatch = useDispatch();
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const changePasswordStatus = useSelector((state: RootState) => state.changePassword);

    const formik = useFormik({
        initialValues: {
            password:"",
            new_password: "",
            new_password_again:""
        },
        validate: (data) => {
            let errors:any = {}; 

            if(!data.password){
                errors.password = i18n.t("isRequired", { input: i18n.t("password") })
            }

            if(!data.new_password){
                errors.new_password = i18n.t("isRequired", { input: i18n.t("newPassword") })
            }

            if(!data.new_password_again){
                errors.new_password_again = i18n.t("isRequired", { input: i18n.t("newPasswordAgain") })
            }

            if(data.new_password !== data.new_password_again){
                errors.new_password_again = i18n.t("passwordsDoesntMatch");
            }

            return errors;
        },
        onSubmit: (data: any) => {
            console.log(data);
            dispatch(changePassword(data.new_password, data.password));
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

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid,
    };

    useEffect(()=>{
        if(changePasswordStatus?.error){
            toast.current.show({
                severity: "error",
                summary: i18n.t("error"),
                detail: changePasswordStatus?.error || i18n.t("anErrorOccurred")
            });
        }

        if(changePasswordStatus?.success === true){
            toast.current.show({
                severity: "success",
                summary: i18n.t("success"),
                detail:i18n.t("redirectingToLoginPage")
            });

            formik.values.password = "";
            formik.values.new_password = "";
            formik.values.new_password_again = "";

            auth.logout();

            setTimeout(()=>{
                window.location.replace("/auth/login");
            },1000);
        }
    }, [changePasswordStatus])

    return (
        <>
            <Toast id="toastMessage" ref={toast}></Toast>
            <form id="settingsForum" onSubmit={formik.handleSubmit}>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header={i18n.t("security")} >
                        <FormColumn>
                            <h2>{i18n.t("changeYourPassword")}</h2>
                            <InputGroup>
                                <InputContainer
                                    label={i18n.t("password")}
                                    name="password"
                                    formiks={inputFormiks}
                                    iprops={{
                                        value:formik.values.password,
                                        onChange:formik.handleChange,
                                        feedback:false,
                                        toggleMask:true
                                    }}
                                    size={6}
                                    component={Password}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputContainer
                                    label={i18n.t("newPassword")}
                                    name="new_password"
                                    formiks={inputFormiks}
                                    iprops={{
                                        value:formik.values.new_password,
                                        onChange:formik.handleChange,
                                        feedback:false,
                                        toggleMask:true
                                    }}
                                    size={6}
                                    component={Password}
                                />

                                <InputContainer
                                    label={i18n.t("newPasswordAgain")}
                                    name="new_password_again"
                                    formiks={inputFormiks}
                                    iprops={{
                                        value:formik.values.new_password_again,
                                        onChange:formik.handleChange,
                                        feedback:false,
                                        toggleMask:true
                                    }}
                                    size={6}
                                    component={Password}
                                />
                            </InputGroup>
                        </FormColumn>
                    </TabPanel>
                </TabView>
                <Button
                    id="createBtn"
                    className="p-mt-3"
                    type="submit"
                    label={i18n.t("submit")}
                />
            </form>
        </>
    );
};

export default SettingsOwner;
