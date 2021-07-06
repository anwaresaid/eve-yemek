import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { i18n } from "../../../language";
import FormColumn from "../../inputs/formColumn";
import InputGroup from "../../inputs/inputGroup";

import * as S from "./style";

const OpenHoursPage = () => {
    const toast = useRef(null);

    const formik = useFormik({
        initialValues: {
            monOpen:false,
            monStart: {},
            monEnd: {},
            tueOpen:false,
            tueStart: {},
            tueEnd: {},
            wedOpen:false,
            wedStart: {},
            wedEnd: {},
            thuOpen:false,
            thuStart: {},
            thuEnd: {},
            friOpen:false,
            friStart: {},
            friEnd: {},
            satOpen:false,
            satStart: {},
            satEnd: {},
            sunOpen:false,
            sunStart: {},
            sunEnd: {},
        },
        validateOnChange:false,
        validate: (data) => {
            let errors: any = {};
            console.log(data);
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

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    return (
        <>
            <Toast id="toastMessage" ref={toast}></Toast>
            <form id="settingsForum" onSubmit={formik.handleSubmit}>
                <FormColumn>
                    <S.ScheduleTable>
                        <tbody>
                            {days.map((day, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>
                                            <h4 className="p-m-4 p-mr-4">{i18n.t(day)}</h4>
                                        </td>
                                        <td>
                                            <InputSwitch name={day + "Open"} checked={formik.values[day + "Open"]} onChange={formik.handleChange} style={{display:"block"}}/>
                                        </td>
                                        <td>
                                            <label className="p-mr-6 p-ml-3">{formik.values[day + "Open"] ? i18n.t("open") : i18n.t("closed")}</label>
                                        </td>
                                        {formik.values[day + "Open"] && 
                                            <td>
                                                <div>
                                                <Calendar
                                                    value={formik.values[day + "Start"]}
                                                    onChange={formik.handleChange}
                                                    name={day + "Start"}
                                                    showTime={true}
                                                    hourFormat={"24"}
                                                    timeOnly={true}
                                                    style={{ width: 100 }}
                                                />
                                                <span className="schedule-seperator"> &nbsp;&nbsp;</span>
                                                <Calendar
                                                    value={formik.values[day + "End"]}
                                                    onChange={formik.handleChange}
                                                    name={day + "End"}
                                                    showTime={true}
                                                    hourFormat={"24"}
                                                    timeOnly={true}
                                                    style={{ width: 100 }}
                                                />
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </S.ScheduleTable>

                    <Button
                        id="createBtn"
                        className="p-mt-3"
                        type="submit"
                        label={i18n.t("submit")}
                    />
                </FormColumn>
            </form>
        </>
    );
};

export default OpenHoursPage;
