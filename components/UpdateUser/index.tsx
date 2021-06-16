import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import {RootState} from 'typesafe-actions'
import {useDispatch,useSelector} from 'react-redux'
import {getSingleUser, updateUser} from '../../store/actions/userslists.action'
import UserDataInput from '../DataInputForms/UserDataInput/UserDataInput'

const UpdateUser = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [id, setID] = useState(props.id)

    const [data, setData] = useState({})

    const userDetails = useSelector((state:RootState) => state.singleUser)
    const { loading, success:getUserSuccess, userData} = userDetails

    const updateDetails = useSelector((state:RootState) => state.updateUser)
    var { updating, success:updateUserSuccess = false, response, error} = updateDetails

    useEffect( () => {
        if(router.query.id){
            console.log("chekcing use effect", router.query.id);
        dispatch(getSingleUser(router.query.id))
        }
     }, [dispatch,router.query.id]);

    useEffect( () => {
        if(getUserSuccess){
            setData({name: userData.name ?? "", email: userData.email ?? "", phone: userData.phone ?? "", roles: userData.roles ?? []})
        }
    }, [getUserSuccess]);

    useEffect(() => {
        if(!updating && updateUserSuccess)
            setTimeout(() => {  router.push(props.returnTo) }, 2000)
    }, [updating])



    return (
        <UserDataInput

            updateProps={{
                id: id,
                updating:updating,
                getUserSuccess:getUserSuccess,
                updateUserSuccess:updateUserSuccess,
                error:error,
                data:data,
                loading: loading,
                setData:setData}}
            ></UserDataInput>
    )
}

export default UpdateUser
