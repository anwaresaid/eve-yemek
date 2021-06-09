import React, {useRef, useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import {RootState} from 'typesafe-actions'
import {useDispatch,useSelector} from 'react-redux'
import UserDataInput from '../../../components/UserDataInput/UserDataInput'
import {Toast} from 'primereact/toast'


const AddUser = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const toast = useRef(null)
    const userAdd = useSelector((state:RootState) => state.addUser)
    const { adding, success:addUserSuccess, response, error} = userAdd

    useEffect(() => {
        if (addUserSuccess){
            toast.current.show({severity: 'success', summary: 'Added User', detail: 'Successfully added user'})
            setTimeout(() => {  router.push('/') }, 2000)
        } 
        else if (error)
            toast.current.show({severity: 'warn', summary: 'Error', detail: 'Server: ' + error})
    }, [addUserSuccess, error])

    return (
        <div id='createUserDiv'>
            <Toast id='toastMessage' ref={toast}></Toast>
            <UserDataInput></UserDataInput>
        </div>
    )
}

export default AddUser