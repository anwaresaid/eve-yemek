import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'

const UpdateCustomer = () => {
   
    const router = useRouter()


    return(
        <div id='updateCustomerUserDiv'>
            <UpdateUser 
                id={router.query.id}
                returnTo="/users/customers">
            </UpdateUser>
        </div>
    )
}

export default UpdateCustomer