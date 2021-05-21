import React, {useRef, useState, useEffect } from 'react'
import {InputText} from 'primereact/inputtext'
import {useRouter} from 'next/router'
import {useDispatch,useSelector} from 'react-redux'
import {addUser, updateUser} from '../../store/actions/userslists.action'
import {InputSwitch} from 'primereact/inputswitch';
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect';
import { ProgressSpinner } from 'primereact/progressspinner'
import {usersListTypes} from '../../store/types/userslists.type'
import {Toast} from 'primereact/toast'
 

const UserDataInput = (props) => {

    const toast = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(props.updateProps?.loading)
    const [inputData, setInputData] = useState(
        props.updateProps ? props.updateProps.data : {name: "", email: "", phone: "", roles: [], address:[], password: ""}
    )

    useEffect(() => {
        if (props.updateProps)
            setInputData(props.updateProps.data)
    }, [props.updateProps?.data])

    useEffect(()=>{
        if (props.updateProps)
            props.updateProps.setData(inputData)
    }, [inputData])

    useEffect(()=>{
        if(props.updateProps?.updateUserSuccess)
            toast.current.show({severity: 'success', summary: 'Updated User', detail: 'Updated user ' + inputData.name})
        else if (!props.updateProps?.updating && props.updateProps?.error)
            toast.current.show({severity: 'warn', summary: 'Error', detail: 'Server: ' + props.updateProps.error});
            
    },[props.updateProps?.updateUserSuccess, props.updateProps?.updating])

    const onSubmit = (e:any) => {
        e.preventDefault();
        if (props.updateProps){
            dispatch(updateUser(props.updateProps.id, props.updateProps.data))
        }
        else 
            dispatch(addUser(inputData))

        //success = false


    }

    const body = (updating) => {
        return (
            <div>
                <h1>{updating ? "Kullanıcı Düzenle" : "Kullanıcı Oluştur"}</h1>
                <form onSubmit={onSubmit}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <h4>Rol</h4>
                            <MultiSelect id="roles" value={inputData.roles ?? ["Error"]} placeholder="Rol seçin" options={usersListTypes.USER_ROLES_FOR_DROPDOWN} onChange={(e) => setInputData({...inputData, roles: e.value})}/>
                        </div>
                        <div className="p-field">
                            <h4>Ad</h4>
                            <InputText id="name" value={inputData.name} type="text" onChange={(e) => setInputData({...inputData, name: e.target.value})}/>
                        </div>
                        <div className="p-field">
                            <h4>E-Posta</h4>
                            <InputText id="email" value={inputData.email} type="text" onChange={(e) => setInputData({...inputData, email: e.target.value})}/>
                        </div>
                        <div className="p-field">
                            <h4>Telefon</h4>
                            <InputText id="phone" value={inputData.phone} type="text" onChange={(e) => setInputData({...inputData, phone: e.target.value})}/>
                        </div>
                        {!updating && 
                            <div className="p-field">
                            <h4>Şifre</h4>
                            <InputText id="password" type="password" value={inputData.password} onChange={(e) => setInputData({...inputData, password: e.target.value})}></InputText>
                        </div>
                        }
                        <div className="p-field">
                            <h4>Aktif</h4>
                            <InputSwitch checked={true}></InputSwitch>
                        </div>
                    </div>
                    <Button type="submit" label={updating ? "Düzenle" : "Oluştur"}></Button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            {loading ? <ProgressSpinner/> : (props.updateProps ? body(true) : body(false))}
        </div>
    )
}

export default (UserDataInput);