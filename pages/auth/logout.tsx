import React, { useEffect, useState } from "react";
import auth from "../../helpers/core/auth";

const Logout = (props) => {
	
    useEffect(()=>{
        auth.logout();
        window.location.replace("/auth/login");
    }, []);

	return (
        <>

        </>
	);
};

export default Logout;