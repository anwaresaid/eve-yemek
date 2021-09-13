import React, {useRef, useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import {RootState} from 'typesafe-actions'
import {useDispatch,useSelector} from 'react-redux'
import UserDataInput from '../../../components/DataInputForms/UserDataInput/UserDataInput'
import {Toast} from 'primereact/toast'
import { i18n } from '../../../language'


const AddUser = () => {

    return (
        <div id='createUserDiv'>
            <UserDataInput></UserDataInput>
        </div>
    )
}

export default AddUser