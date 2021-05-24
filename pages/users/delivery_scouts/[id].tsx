import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'

const UpdateDeliveryScout = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    return(
        <UpdateUser 
            id={id}
            returnTo="/users/delivery_scouts">
        </UpdateUser>
    )
}

export default UpdateDeliveryScout