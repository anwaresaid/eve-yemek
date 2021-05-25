import React from "react";
import moment from "moment";

const cardDate = (props) => {    
    return (
        <div>
            {moment(props.date).fromNow()}
        </div>
    );
}

export default cardDate;