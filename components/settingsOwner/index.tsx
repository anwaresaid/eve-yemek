import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { i18n } from "../../language";
import FormColumn from "../inputs/formColumn";
import InputContainer from "../inputs/inputContainer";
import InputGroup from "../inputs/inputGroup";

const SettingsOwner = () => {

    const [activeIndex, setActiveIndex] = useState(0);

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
            console.log(data);
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

    return (
        <>
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
