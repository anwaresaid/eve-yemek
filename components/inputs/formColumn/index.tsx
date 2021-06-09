import React from "react";

type IProps = {
    children:any,
    divideCount?: 1 | 2 | 3;
}

const FormColumn = (props:IProps) => {

    const rowClass = "p-col-12" + ( (props.divideCount === 2) ? " p-lg-6" : ( props.divideCount === 3 ? " p-lg-6 p-xxl-4" : "" ) );

    return (
        <>
            <div className={rowClass}>
                <div className="p-mx-1">
                    {props.children}
                </div>
            </div>
        </>
    )

}

export default FormColumn;