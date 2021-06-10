import React from "react";

type IProps = {
    children:any
}

const InputGroup = (props:IProps) => {

    return (
        <>
            <div className="p-fluid p-grid p-align-end">
                {props.children}
            </div>
        </>
    )

}

export default InputGroup;