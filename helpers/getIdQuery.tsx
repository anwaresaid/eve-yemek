import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const getIdQuery = () => {

    const router = useRouter();
    const [queryValue, setQueryValue] = useState<any>()

    useEffect(()=>{
        if(router.query?.id){
            setQueryValue(router.query?.id);
        }
    }, [router.query?.id]);

    return queryValue || false;

}