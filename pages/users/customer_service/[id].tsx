import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import UpdateUser from '../../../components/UpdateUser';
import BackBtn from '../../../components/backBtn';

const UpdateCustomerService = () => {
   
    const router = useRouter()

    return(
        <div id='updateUserDiv'>
            <BackBtn router={router}/>
            <UpdateUser 
                id={router.query.id}
                returnTo="/users/customer_service">
            </UpdateUser>
        </div>
    )
}

export default UpdateCustomerService