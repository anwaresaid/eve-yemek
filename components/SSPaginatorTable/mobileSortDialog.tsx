import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import React, { useState } from "react"
import { useEffect } from "react"
import { i18n } from "../../language"

const MobileSortDialog = (props) => {

    const [sortField, setSortField] = useState('')
    const [sortBy, setSortBy] = useState('')
    const sortFieldOptions = []

    props.columns.map(col => {
        if (col.sortable) {
            sortFieldOptions.push({
                label: col.header,
                value: col.field
            })
        }
    })

    useEffect(() => {
        if (!sortBy)
            return
        props.setSort({sortField: sortField, sortOrder: sortBy == 'asc' ? 1 : (sortBy == 'desc' ? -1 : 0)})
    }, [sortField, sortBy])

    return (
        <Dialog className="p-fluid" header={i18n.t('sort')} visible={props.open} onHide={props.hide} >
            <Dropdown
                className="p-field"
                options={sortFieldOptions}
                placeholder={i18n.t('sortField')}
                value={sortField}
                onChange={e => setSortField(e.target.value)}
            />
            <Dropdown
                className="p-field"
                placeholder={i18n.t('sequence')}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                options={[{ label: i18n.t('ascending'), value: 'asc' }, { label: i18n.t('descending'), value: 'desc' }]}
            />
        </Dialog>
    )
}

export default MobileSortDialog