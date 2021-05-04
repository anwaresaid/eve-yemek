import React, { useEffect, useState } from "react";

const Logout = (props) => {
	
    useEffect(()=>{
        localStorage.clear();
        window.location.replace("/auth/login");
    }, []);

	return (
        <>

        </>
	);
};

export default Logout;