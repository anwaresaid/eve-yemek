import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import {RootState} from 'typesafe-actions'
import {useDispatch,useSelector} from 'react-redux'
import UserDataInput from '../../../components/UserDataInput/UserDataInput'

const AddUser = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <UserDataInput></UserDataInput>
    )
}

export default AddUser