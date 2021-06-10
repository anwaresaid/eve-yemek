import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import UpdateUser from '../../../components/UpdateUser';

const UpdateCustomerService = () => {
   
    const router = useRouter()
    const [id, setID] = useState(router.query.id)

    return(
        <div id='updateUserDiv'>

            <UpdateUser 
                id={id}
                returnTo="/users/customer_service">
            </UpdateUser>
        </div>
    )
}

export default UpdateCustomerService