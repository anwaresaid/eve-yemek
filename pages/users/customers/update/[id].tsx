import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import {RootState} from 'typesafe-actions'
import {useDispatch,useSelector} from 'react-redux'
import {getSingleUser, updateUser} from '../../../../store/actions/userslists.action'
import UserDataInput from '../../../../components/UserDataInput/UserDataInput'



const UpdateUser = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [id, setID] = useState(router.query.id)

    const [data, setData] = useState({name:'', email:'', phone:'', roles:[]})

    const userDetails = useSelector((state:RootState) => state.singleUser)
    const { loading=true, success:getUserSuccess, userData} = userDetails

    const updateDetails = useSelector((state:RootState) => state.updateUser)
    var { updating, success:updateUserSuccess = false, response, error} = updateDetails

    useEffect( () => {
        dispatch(getSingleUser(id))
     }, [dispatch]);

    useEffect( () => {
        if(getUserSuccess){
            setData({name: userData.name ?? "", email: userData.email ?? "", phone: userData.phone ?? "", roles: userData.roles ?? []})
        }
    }, [getUserSuccess]);
    
    useEffect(() => {
        if(!updating && updateUserSuccess)
            setTimeout(() => {  router.push('/users/customers') }, 2000)
    }, [updating])

    return (
        <UserDataInput 
            updateProps={{
                id: id, 
                loading:loading, 
                updating:updating,
                getUserSuccess:getUserSuccess, 
                updateUserSuccess:updateUserSuccess,
                error:error,
                data:data, 
                setData:setData}} 
        />
    )
}

export default UpdateUser