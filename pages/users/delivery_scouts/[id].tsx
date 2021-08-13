import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import UpdateUser from '../../../components/UpdateUser'
import BackBtn from '../../../components/backBtn'

const UpdateScout = () => {
   
    const router = useRouter()


    return(
        <div id='updateScoutUserDiv'>
            <BackBtn router={router}/>
            <UpdateUser 
                id={router.query.id}
                returnTo="/users/delivery_scouts">
            </UpdateUser>
        </div>
    )
}

export default UpdateScout