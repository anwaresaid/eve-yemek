import React, { useState, useEffect } from "react"
import { i18n } from "../../../language"
import activeTag from "../../../components/InTableComponents/activeTag"
import editButton from "../../../components/InTableComponents/editButton"
import UsersListsService from "../../../store/services/userslists.service"
import SSPaginatorTable from "../../../components/SSPaginatorTable"
import { useRouter } from "next/router"
import { parseDateInOneRow } from "../../../helpers/dateFunctions"

const deliveryScoutList = () => {

    const router = useRouter();
    const usersListsService = new UsersListsService();

    const parseDeliveryScoutData = (data) => {
        for (let i = 0; i < data.length; i++){
          let deliveryCount = data[i].count
          let scout = data[i].user[0]
          delete data[i].count
          delete data[i].user
          data[i] = { ...data[i], ...scout, delivery_count: deliveryCount}
          data[i] = parseDateInOneRow(data[i])
        }
        return data
      }

    const fetch = (offset, limit, fields = null, text = null) => {
        return new Promise((resolve, reject) => {
            usersListsService.getDeliveryScouts(offset, limit)
                .then(res => resolve(parseDeliveryScoutData(res)))
                .catch(err => reject(err))
        })
    }

    const columns = [
        { field: 'name', header: i18n.t('name') },
        { field: 'email', header: i18n.t('email') },
        { field: 'phone', header: i18n.t('telephone') },
        { field: 'howLongAgo', header: i18n.t('created') }, // in days
        { field: 'active', header: i18n.t('active'), body: (rowData) => activeTag(rowData.active) },
        { field: 'delivery_count', header: i18n.t('deliveryCount') },
        { field: 'ops', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, 'users/delivery_scouts') }
    ]

    return (
        <div id="deliveryScoutsTable">
            <SSPaginatorTable
                headerText={i18n.t('listOfX', { x: i18n.t('deliveryScouts') })}
                columns={columns}
                fetch={fetch}
                emptyMessage={i18n.t('noXfound', { x: i18n.t('deliveryScouts') })}
            >
            </SSPaginatorTable>
        </div>
    )
}

export default deliveryScoutList;