import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import React, { useState } from "react"
import { i18n } from "../../language"

const MobileFilterDialog = (props) => {

    const [filterBy, setFilterBy] = useState('')
    const filterByOptions = []

    props.columns.map(col => {
        if (col.filter) {
            filterByOptions.push({
                label: col.header,
                value: col.field
            })
        }
    })

    const getColByField = (field) => {
        return props.columns.filter(col => col.field == field)[0]
    }

    return (
        <Dialog className="p-fluid" header={i18n.t('filter')} visible={props.open} onHide={props.hide} >
            <Dropdown
                className="p-field"
                options={filterByOptions}
                placeholder={i18n.t('filterField')}
                value={filterBy}
                onChange={e => setFilterBy(e.target.value)}
            />
            <div className="p-field">
                {filterBy ? props.getFilterElement(getColByField(filterBy), 'mobile_dialog') : <div></div>}
            </div>
        </Dialog>
    )
}

export default MobileFilterDialog