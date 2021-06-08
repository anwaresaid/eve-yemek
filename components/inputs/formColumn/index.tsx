import React from "react";

type IProps = {
    children:any
}

const FormColumn = (props:IProps) => {

    return (
        <>
            <div className="p-col-12 p-lg-6 p-xl-4">
                <div className="p-mx-1">
                    {props.children}
                </div>
            </div>
        </>
    )

}

export default FormColumn;