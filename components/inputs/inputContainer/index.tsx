import classNames from "classnames";
import React from "react";

type IProps = {
    label:string,
    name:string,
    getFormErrorMessage:Function,
    isFormFieldValid:Function,
    children:any
}

const InputContainer = (props:IProps) => {

    return (
        <>
             <div className="p-field p-col-12">
                <h4>{props.label}</h4>
                {props.children}
                <label htmlFor={props.name} className={classNames({ 'p-error': props.isFormFieldValid(props.name) })}></label>
                {props.getFormErrorMessage(props.name)}
            </div>
        </>
    )

}

export default InputContainer;