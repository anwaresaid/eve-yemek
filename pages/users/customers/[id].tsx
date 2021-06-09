import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'

const UpdateCustomer = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    useEffect(() => {
        setID(router.query.id)
    },[router.query.id])

    return(
        <div id='updateCustomerUserDiv'>
            <UpdateUser 
                id={id}
                returnTo="/users/customers">
            </UpdateUser>
        </div>
    )
}

export default UpdateCustomer