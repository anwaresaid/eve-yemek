import React from "react";

type IProps = {
    children:any
}

const InputGroup = (props:IProps) => {

    return (
        <>
            <div className="p-fluid p-grid">
                {props.children}
            </div>
        </>
    )

}

export default InputGroup;