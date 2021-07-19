import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'
import BackBtn from '../../../components/backBtn'

const UpdateRestaurantOwner = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    return(
        <div id='restaurantOwnersDiv'>
            <BackBtn router={router}/>
            <UpdateUser 
                id={id}
                returnTo="/users/restaurant_owners">
            </UpdateUser>
        </div>
    )
}

export default UpdateRestaurantOwner