import React, { useState, useEffect } from 'react';
import {InputText} from 'primereact/inputtext';
import {useRouter} from 'next/router';
import {useDispatch,useSelector} from 'react-redux';
import {getSingleUser, updateUser} from '../../../store/actions/userslists.action'
import {RootState} from 'typesafe-actions';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
 

const AddOrUpdateUser = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [data, setData] = useState({name:'', email:'', phone:''}); 
    const [id, setID] = useState(router.query.id+"")
    
    
    const userDetails = useSelector((state:RootState) => state.singleUser);
    const { loading=true, success:getUserSuccess, userData} = userDetails;

    const updateDetails = useSelector((state:RootState) => state.updateUser);
    var { updating, success:updateUserSuccess = false, response} = updateDetails;
    
    useEffect( () => {
        dispatch(getSingleUser(id))
     }, [dispatch]);

    useEffect( () => {
        if(getUserSuccess){
            setData({name: userData.name ?? "", email: userData.email ?? "", phone: userData.phone ?? ""})
        }
    }, [getUserSuccess]);

    useEffect(() => {
        if(!updating && updateUserSuccess)
            router.push('/users/customers')
    }, [updating])

    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(updateUser(id, data))
    }

    return (
        <div>
            {loading && <ProgressSpinner/>}
            {!loading && getUserSuccess && 
            <div>
                <h1>Update</h1>
                <form onSubmit={onSubmit}>
                    <div className="p-fluid">
                        <div className="p-field p-col-12">
                            <h4>Ad</h4>
                            <InputText id="name" value={data?.name} type="text" onChange={(e) => setData({...data, name: e.target.value})}/>
                        </div>
                        <div className="p-field p-col-12">
                            <h4>E-Posta</h4>
                            <InputText id="email" value={data?.email} type="text" onChange={(e) => setData({...data, email: e.target.value})}/>
                        </div>
                        <div className="p-field p-col-12">
                            <h4>Telefon</h4>
                            <InputText id="telephone" value={data?.phone} type="text" onChange={(e) => setData({...data, phone: e.target.value})}/>
                        </div>
                    </div>
                    <Button type="submit" label="Update"></Button>
                </form>
            </div>}
        </div>
    )
}

export default (AddOrUpdateUser);