import React, { useCallback, useEffect, useRef, useState } from "react"
import { Column } from 'primereact/column';
import * as S from '../../styles/standard_table_style/standard.table.style'
import { i18n } from "../../language";
import _ from 'lodash';
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { parseDateInOneRow } from "../../helpers/dateFunctions";
import MobileFilterDialog from "./mobileFilterDialog";
import { Button } from "primereact/button";
import MobileSortDialog from "./mobileSortDialog";

type SSPTProps = {
    headerText?: any,
    fetch: (params: any) => Promise<any>,
    columns: Array<any>,
    noPaginator?: boolean,
    emptyMessage?: string
}

const SSPaginatorTable = (props: SSPTProps) => {

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
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState(0)
    const [isMobileFilterDialogOpen, setMobileFilterDialogOpen] = useState(false)
    const [isMobileSortDialogOpen, setMobileSortDialogOpen] = useState(false)

    const [filterValues, setFilterValues] = useState({})

    const [debouncedFetch] = useState(() => _.debounce((val) => setSearchKey(val), 800));

    const tableHeader = () => {
        return (
            <div id='tableHeader' className="table-header">
                {props.headerText ?? <span></span>}
                {
                    window.innerWidth < 825 &&
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <Button label={i18n.t('filter')} onClick={() => setMobileFilterDialogOpen(true)}></Button>
                        </div>
                        <div className="p-field p-col">
                            <Button label={i18n.t('sort')} onClick={() => setMobileSortDialogOpen(true)}></Button>
                        </div>

                    </div>
                }
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
            setShowPaginator(false)
        } else {
            setShowPaginator(true)
        }
        props.fetch({
            offset: searchKey ? 0 : first,
            limit: searchKey ? 9999 : rowsPerPage,
            fields: searchKey ? (searchBy ?? null) : null,
            text: searchKey ?? null,
            sort_field: sortField,
            sort_by: sortField ? (sortOrder === 1 ? 'asc' : (sortOrder === -1 ? 'desc' : null)) : null
        })
            .then(res => {
                setTotalItems(res.total)
                setCurrentRows((res.items ?? res).filter(row => !row.is_deleted).map(one => {
                    if (one.createdAt) {
                        one = parseDateInOneRow(one)
                        return one
                    }
                }))
                setLoading(false)
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('noData') })
                setCurrentRows([])
                setLoading(false)
            })
    }, [rowsPerPage, first, searchKey, sortField, sortOrder])

    useEffect(() => {
        if (loading) {
            let filterInputs = document.querySelectorAll('[id^="filter_input_"]')
            filterInputs.forEach((one: HTMLElement) => {
                if (one === document.activeElement) {
                    setReturnFocusTo(one.id)
                    one.blur()
                }
            })
        } else {
            document.getElementById(returnFocusTo)?.focus()
            setReturnFocusTo('')
        }
    }, [loading])

    const onPage = (e) => {
        setFirst(e.first)
        setRowsPerPage(e.rows)
    }

    const setSort = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder)
    }

    const clearFilterInputsExcept = (except) => {
        /*let filterInputs = document.querySelectorAll('[id^="filter_input_"]')
        filterInputs.forEach((one: HTMLInputElement) => {
            if (one.id != except) {
                one.value = ''
            }
        })*/
        let temp = {...filterValues}
        Object.keys(temp).map(key => {
            if (key != except){
                delete temp[key]
            }
        })
        setFilterValues(temp)
    }

    const getFilterElement = (col, source = "") => {
        let currentID = "filter_input_" + col.field + source
        switch (col.filterType) {
            case 'search':
                return <InputText id={currentID} value={filterValues[currentID]} placeholder={col.header}
                    style={{ width: '145px' }}
                    onChange={e => {
                        let temp = {...filterValues}
                        temp[currentID] = e.target.value
                        setFilterValues(temp)
                        clearFilterInputsExcept(currentID)
                        setSearchBy(col.field)
                        debouncedFetch(e.target.value)
                    }}></InputText>
            case 'dropdown':
                return <Dropdown id={currentID} value={filterValues[currentID]} options={col.dropdownOptions} placeholder={col.header}
                    onChange={e => {
                        let temp = {...filterValues}
                        temp[currentID] = e.target.value
                        setFilterValues(temp)
                        clearFilterInputsExcept(currentID)
                        setSearchBy(col.field)
                        debouncedFetch(e.target.value)
                    }}>
                </Dropdown>
            default: 
                    return <div></div>
        }
    }

    const dynamicColumns = props.columns.map((col, i) => {
        return <Column key={i} {...col} filter={col.filter} filterElement={getFilterElement(col)}></Column>;
    });

    return (
        <div>
            <Toast id="toastMessage" ref={toast}></Toast>
            <MobileFilterDialog
                open={isMobileFilterDialogOpen}
                hide={() => setMobileFilterDialogOpen(false)}
                getFilterElement={getFilterElement}
                columns={props.columns}
            />
            <MobileSortDialog
                open={isMobileSortDialogOpen}
                hide={() => setMobileSortDialogOpen(false)}
                setSort={setSort}
                columns={props.columns}
            />
            <S.Table id='ssptable' {...props} className="p-datatable-gridlines p-datatable-sm p-datatable-striped" autoLayout={true} paginator={!props.noPaginator && showPaginator}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate={i18n.t('showingXtoYofZ', { x: '{first}', y: '{last}', z: '{totalRecords}' })}
                value={currentRows}
                first={first}
                rows={rowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                header={tableHeader()}
                totalRecords={totalItems}
                lazy
                onPage={onPage}
                loading={loading}
                onSort={e => setSort(e)}
                sortField={sortField}
                sortOrder={sortOrder}
            >
                {dynamicColumns}
            </S.Table>
        </div>
    )
}

export default SSPaginatorTable
