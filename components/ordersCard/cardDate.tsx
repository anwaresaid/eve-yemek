import React from "react";
import moment from "moment";

const cardDate = (props) => {    
    return (
        <div id='editDate'>
            {moment(props.date).fromNow()}
        </div>
    );
}

export default cardDate;