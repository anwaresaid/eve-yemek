import React, { useCallback, useEffect, useRef, useState } from "react"
import { Column } from 'primereact/column';
import * as S from '../../styles/standard_table_style/standard.table.style'
import { i18n } from "../../language";
import _ from 'lodash';
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

const SSPaginatorTable = (props) => {

    const [first, setFirst] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showPaginator, setShowPaginator] = useState(true)

    const [returnFocusTo, setReturnFocusTo] = useState('')

    const toast = useRef(null)

    const [currentRows, setCurrentRows] = useState([])
    const [searchKey, setSearchKey] = useState(null)
    const [searchBy, setSearchBy] = useState('')
    const [debouncedFetch] = useState(() => _.debounce((val) => setSearchKey(val), 800));

    const headerComp = () => {
        return (
            <div id='tableHeader' className="table-header">
                {props.headerText}
            </div>
        );
    }

    useEffect(() => {
        setLoading(true)
        if (searchKey) {
            if (!searchBy) {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('error') })
                setLoading(false)
                return
            }
            setFirst(0)
            setRowsPerPage(9999)
            setShowPaginator(false)
        } else {
            setFirst(0)
            setRowsPerPage(10)
            setShowPaginator(true)
        }
        props.fetch(first, rowsPerPage, searchBy ?? null, searchKey ?? null)
            .then(res => {
                setTotalItems(res.total)
                setCurrentRows(res.items ?? res)
                setLoading(false)
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('noData') })
                setCurrentRows([])
                setLoading(false)
            })
    }, [rowsPerPage, first, searchKey])

    useEffect(() => {
        if (loading){
            let filterInputs = document.querySelectorAll('[id^="filter_input_"]')
            filterInputs.forEach((one:HTMLElement) => {
                if (one === document.activeElement){
                    setReturnFocusTo(one.id)
                    one.blur()
                }
            })
        } else {
            document.getElementById(returnFocusTo).focus()
            setReturnFocusTo('')
        }
    }, [loading])

    const onPage = (e) => {
        setFirst(e.first)
        setRowsPerPage(e.rows)
    }

    const clearFilterInputsExcept = (except) => {
        let filterInputs = document.querySelectorAll('[id^="filter_input_"]')
        filterInputs.forEach((one) => {
            if (one.id != except) {
                (one as HTMLInputElement).value = ''
            }
        })
    }

    const getFilterElement = (col) => {
        let currentID = "filter_input_" + col.field
        switch (col.filterType) {
            case 'search':
                return <InputText id={currentID} placeholder={col.header}
                    style={{ width: '145px' }}
                    onChange={e => {
                        clearFilterInputsExcept(currentID)
                        setSearchBy(col.field)
                        debouncedFetch(e.target.value)
                    }}></InputText>
            case 'dropdown':
                return <Dropdown id={currentID} value={searchKey} options={col.dropdownOptions} placeholder={col.header}
                    onChange={e => {
                        clearFilterInputsExcept(currentID)
                        setSearchBy(col.field)
                        debouncedFetch(e.target.value)
                    }}>
                </Dropdown>
        }
    }

    const dynamicColumns = props.columns.map((col, i) => {
        return <Column key={i} {...col} filter={col.filter} filterElement={getFilterElement(col)} sortable />;
    });

    return (
        <div>
            <Toast id="toastMessage" ref={toast}></Toast>
            <S.Table id='ssptable' {...props} className="p-datatable-gridlines p-datatable-sm p-datatable-striped" autoLayout={true} paginator={!props.noPaginator && showPaginator}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate={i18n.t('showingXtoYofZ', { x: '{first}', y: '{last}', z: '{totalRecords}' })}
                value={currentRows}
                first={first}
                rows={rowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                header={headerComp()}
                totalRecords={totalItems}
                lazy
                onPage={onPage}
                loading={loading}
            >
                {dynamicColumns}
            </S.Table>
        </div>
    )
}

export default SSPaginatorTable