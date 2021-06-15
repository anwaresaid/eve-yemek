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
import { changePasswordRequest } from "../../store/actions/settings.action";
import FormColumn from "../inputs/formColumn";
import InputContainer from "../inputs/inputContainer";
import InputGroup from "../inputs/inputGroup";

const SettingsOwner = () => {

    const dispatch = useDispatch();
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const changePasswordRequestState = useSelector((state: RootState) => state.changePassword);

    const formik = useFormik({
        initialValues: {
            new_password: "",
        },
        validate: (data) => {
            let errors:any = {}; 

            if(!data.new_password){
                errors.new_password = i18n.t("isRequired", { input: i18n.t("newPassword") })
            }

            return errors;
        },
        onSubmit: (data: any) => {
            dispatch(changePasswordRequest(auth.user.email));
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
        if(changePasswordRequestState?.error){
            toast.current.show({
                severity: "error",
                summary: i18n.t("error"),
                detail: i18n.t("anErrorOccurred")
            });
        }
    }, [changePasswordRequestState])

    return (
        <>
            <Toast id="toastMessage" ref={toast}></Toast>
            <form id="settingsForum" onSubmit={formik.handleSubmit}>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header={i18n.t("security")} >
                        <FormColumn>
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
