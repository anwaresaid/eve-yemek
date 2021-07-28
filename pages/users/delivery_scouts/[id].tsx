import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'
import BackBtn from '../../../components/backBtn'

const UpdateDeliveryScout = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    return(
        <div id='deliveryScoutsDiv'>
            <BackBtn router={router}/>
            <UpdateUser 
                id={id}
                returnTo="/users/delivery_scouts">
            </UpdateUser>
        </div>
    )
}

export default UpdateDeliveryScout