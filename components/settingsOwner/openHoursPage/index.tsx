import { useFormik } from "formik";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { momentSetLocale } from "../../../helpers/dateFunctions";
import { getIdQuery } from "../../../helpers/getIdQuery";
import { i18n } from "../../../language";
import { findRestaurant } from "../../../store/actions/restaurant.action";
import { updateSchedule } from "../../../store/actions/settings.action";
import FormColumn from "../../inputs/formColumn";
import InputGroup from "../../inputs/inputGroup";

import * as S from "./style";

const OpenHoursPage = () => {
    const toast = useRef(null);

    const id = getIdQuery();

    const [readyToShow, setReadyToShow] = useState(false);

    const resDetails = useSelector((state: RootState) => state.findRestaurant);
    const { loading: resLoading, success: resSuccess, restaurant } = resDetails;

    const scheduleDetails = useSelector((state: RootState) => state.updateSchedule);
    const { loading: scheduleLoading, success: scheduleSuccess, error:scheduleError } = scheduleDetails;

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            mon:{
                open:false,
                start:null,
                end:null
            },
            tue:{
                open:false,
                start:null,
                end:null
            },
            wed:{
                open:false,
                start:null,
                end:null
            },
            thu:{
                open:false,
                start:null,
                end:null
            },
            fri:{
                open:false,
                start:null,
                end:null
            },
            sat:{
                open:false,
                start:null,
                end:null
            },
            sun:{
                open:false,
                start:null,
                end:null
            }
        },
        validateOnChange:false,
        validate: (data) => {
            let errors: any = {};

            
            Object.entries(data).map((day:any)=>{

                if(day[1].open){
                    if(!day[1].start || !day[1].end){
                        errors[day[0]] = "Başlangıç ve bitiş zamanını belirttiğinizden emin olun";
                    }else if(moment(day[1].end).diff(moment(day[1].start), "seconds") < 0){
                        errors[day[0]] = "Başlangıç zamanı bitiş zamanından daha büyük olamaz";
                    }
                }
            });

            return errors;
        },
        onSubmit: (data: any) => {

            let resultDays = {};

            for (const day in data) {

                if(data[day].open === false){
                    resultDays[day] = ["-1", "-1"];
                    continue;
                }

                resultDays[day] = [moment(data[day].start).format("LT"), moment(data[day].end).format("LT")];
            }


            dispatch(updateSchedule(id, resultDays));
        }
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

    useEffect(()=>{
        momentSetLocale();
    }, []);

    useEffect(()=>{
        if(id)
            dispatch(findRestaurant(id));
    }, [id]);

    useEffect(()=>{
        if(resSuccess && restaurant?.schedule && restaurant?.schedule?.mon){
            for (const day in restaurant?.schedule) {
                if(days.includes(day)){
                    const isOpen =  restaurant.schedule[day][0] != "-1" && restaurant.schedule[day][1] != "-1";
                    formik.values[day].open = isOpen;
                    if(isOpen){
                        formik.values[day].start = moment(restaurant.schedule[day][0], "HH:mm").toDate();
                        formik.values[day].end = moment(restaurant.schedule[day][1], "HH:mm").toDate();
                    }
                }
            }
            setReadyToShow(true);
        }
    }, [resSuccess]);

    useEffect(()=>{
        console.log(scheduleDetails, scheduleSuccess, scheduleError, scheduleLoading);
        if(scheduleSuccess){
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('success') })
        }else if(scheduleError){
            toast.current.show({severity: "error", summary: i18n.t("error"), detail:scheduleError || i18n.t("anErrorOccurred")});
        }
    }, [scheduleDetails]);

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid,
    };

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    return (
        <>
            <Toast id="toastMessage" ref={toast}></Toast>
            <form id="settingsForum" onSubmit={formik.handleSubmit}>
                {resLoading && <ProgressSpinner/>}
                <FormColumn>
                    <S.ScheduleTable>
                        <tbody>
                            {readyToShow && days.map((day, index)=>{
                                return (<React.Fragment key={index}>
                                    <tr key={index}>
                                        <td>
                                            <h4 className="p-m-4 p-mr-4">{i18n.t(day)}</h4>
                                        </td>
                                        <td>
                                            <InputSwitch name={day + ".open"} checked={formik.values[day].open} onChange={formik.handleChange} style={{display:"block"}}/>
                                        </td>
                                        <td>
                                            <label className="p-mr-6 p-ml-3">{formik.values[day].open ? i18n.t("open") : i18n.t("closed")}</label>
                                        </td>
                                        {formik.values[day].open && 
                                            <td>
                                                <div>
                                                <Calendar
                                                    value={formik.values[day].start}
                                                    onChange={formik.handleChange}
                                                    name={day + ".start"}
                                                    showTime={true}
                                                    hourFormat={"24"}
                                                    timeOnly={true}
                                                    style={{ width: 100 }}
                                                />
                                                <span className="schedule-seperator"> &nbsp;&nbsp;</span>
                                                <Calendar
                                                    value={formik.values[day].end}
                                                    onChange={formik.handleChange}
                                                    name={day + ".end"}
                                                    showTime={true}
                                                    hourFormat={"24"}
                                                    timeOnly={true}
                                                    style={{ width: 100 }}
                                                />
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                    {isFormFieldValid(day) && 
                                        <tr>
                                            <td colSpan={5}>
                                                <span className={"p-ml-4"}>
                                                    {getFormErrorMessage(day)}
                                                </span>
                                            </td>
                                        </tr>
                                    }
                                </React.Fragment>);
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
