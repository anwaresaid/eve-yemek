import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UpdateUser from '../../../components/UpdateUser'
import BackBtn from '../../../components/backBtn'
import UsersListsService from '../../../store/services/userslists.service'
import AddressesService from '../../../store/services/addresses.service'
import UserDataInput from '../../../components/DataInputForms/UserDataInput/UserDataInput'
import { useSelector } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { TabPanel, TabView } from 'primereact/tabview'
import { i18n } from '../../../language'
import { ProgressSpinner } from 'primereact/progressspinner'

const UpdateDeliveryScout = () => {

    const router = useRouter()
    const [scoutDetails, setScoutDetails] = useState(null)

    const usersListsService = new UsersListsService()
    const addressesService = new AddressesService()

    const userDetails = useSelector((state: RootState) => state.singleUser)
    const { loading, success: getUserSuccess, userData } = userDetails

    const updateDetails = useSelector((state: RootState) => state.updateUser)
    var { updating, success: updateUserSuccess = false, response, error } = updateDetails

    useEffect(() => {
        if (!scoutDetails || scoutDetails?.id !== router.query.id) {
            if (!router.query.id)
                return
          
            usersListsService.getScoutDetails(router.query.id).then((res) => {
                console.log(res)
                if (typeof res[0].user.address === 'string') {
                    setScoutDetails(null)
                    addressesService.getAddressDetails(res[0].user.address).then((addRes) => {
                        let newDetails = {...res[0].user, address: addRes}
                        setScoutDetails(newDetails)
                    })
                } else {
                    setScoutDetails(res[0].user)
                }
            })
        }
    }, [router.query.id])

    useEffect(() => {

    }, [scoutDetails])

    return (
        <div id='deliveryScoutsDiv'>
            <BackBtn router={router} />
            <TabView>
                <TabPanel header={i18n.t('updateUser')}>
                    {
                        scoutDetails ?
                        <UserDataInput

                            updateProps={{
                                id: router.query.id,
                                updating: updating,
                                getUserSuccess: getUserSuccess,
                                updateUserSuccess: updateUserSuccess,
                                error: error,
                                data: scoutDetails,
                                loading: loading
                            }}
                        ></UserDataInput>
                        :
                        <ProgressSpinner></ProgressSpinner>
                    }
                </TabPanel>
                <TabPanel header={i18n.t('paymentInformation')}>

                </TabPanel>
                <TabPanel header={i18n.t('deliveryInformation')}>

                </TabPanel>
            </TabView>
        </div>
    )
}

export default UpdateDeliveryScout