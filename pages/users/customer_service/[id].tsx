import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'

const UpdateCustomerService = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    return(
        <UpdateUser 
            id={id}
            returnTo="/users/customer_service">
        </UpdateUser>
    )
}

export default UpdateCustomerService