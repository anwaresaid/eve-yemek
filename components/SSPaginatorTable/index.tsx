import React, { useCallback, useEffect, useRef, useState } from "react"
import { Column } from 'primereact/column';
import * as S from '../../styles/standard_table_style/standard.table.style'
import { i18n } from "../../language";
import _ from 'lodash';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

const SSPaginatorTable = (props) => {

    const [first, setFirst] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showPaginator, setShowPaginator] = useState(true)

    const toast = useRef(null)

    const [currentRows, setCurrentRows] = useState([])
    const [searchKey, setSearchKey] = useState(null)
    const [searchBy, setSearchBy] = useState('name')
    const [debouncedFetch] = useState((e) => _.debounce((e) => setSearchKey(e.target.value), 1000));

    const headerComp = () => {
        return (
            <div id='tableHeader' className="table-header">
                {i18n.t('listOfX', { x: i18n.t('restaurants') })}
                <span id='tableIcon' className="p-input-icon-left">
                    <i id='tableSearchIcon' className="pi pi-search" />
                    <InputText id='tableSearch' type="search" onInput={debouncedFetch} placeholder="Search" />
                    <Dropdown placeholder={i18n.t('searchBy')} value={searchBy} onChange={(e) => setSearchBy(e.value)}
                        options={props.searchOptions}></Dropdown>
                </span>
            </div>
        );
    }

    useEffect(() => {
        setLoading(true)
        if (searchKey) {
            if (!searchBy){
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
                setCurrentRows(res.items)
                setLoading(false)
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('noData') })
                setCurrentRows([])
                setLoading(false)
            })
    }, [rowsPerPage, first, searchKey])

    const onPage = (e) => {
        setFirst(e.first)
        setRowsPerPage(e.rows)
    }

    const dynamicColumns = props.columns.map((col, i) => {
        return <Column key={i} {...col} sortable />;
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