import classNames from "classnames";
import React from "react";

type IProps = {
    label:string,
    name:string,
    formiks:{
        getFormErrorMessage:Function,
        isFormFieldValid:Function,
    },
    component:any,
    iprops:any,
    size?:2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const InputContainer = (props:IProps) => {

    const sizeClass = "p-col" + (props.size ? " p-md-"+props.size : "");

    return (
        <>
             <div className={sizeClass} id={"div_"+props.name}>
                <h4 id={"header_"+props.name}>{props.label}</h4>
                <props.component name={props.name} id={props.name} className={classNames({ 'p-invalid': props.formiks.isFormFieldValid(props.name) })} {...props.iprops}/>
                <label id={"error_"+props.name} htmlFor={props.name} className={classNames({ 'p-error': props.formiks.isFormFieldValid(props.name) })}>
                    {props.formiks.getFormErrorMessage(props.name)}
                </label>
            </div>
        </>
    )

}

export default InputContainer;