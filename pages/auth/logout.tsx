import React, { useEffect, useState } from "react";

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