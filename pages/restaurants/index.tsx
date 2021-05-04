import React, { useState, useRef, useEffect } from 'react';
import * as S from './style'
import { Column } from 'primereact/column';
import ProductService from './restTest';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import classNames from 'classnames';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';


const Index = () => {


    const [restaurants, setRestaurants] = useState([]);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');

    const restaurantService = new ProductService();

//pagination

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = currentPage;
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }

    useEffect(() => {
        setRestaurants(restaurantService.getProductsSmall().data);

        
    }, []);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
// global filter
    const header =(
        <div className="table-header">
            List of Restaurants
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
            </span>
        </div>
    )
    
    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText className="p-ml-1" value={currentPage} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.image}`}  alt={rowData.image} className="product-image" />
    }
    const statusBodyTemplate = (rowData) => {
        if(rowData.active == "true")
        {
            return <Tag className="p-mr-2" severity="success" value={rowData.active} rounded></Tag>;
        }
        else
        { 
            return <Tag severity="danger" value={rowData.active} rounded></Tag>;
        }
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" />
            </React.Fragment>
        );
    }
    return (
        <div>

            <div className="card">
                <h1>Restaurants</h1>
                    <S.Table value={restaurants} removableSort paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                    header={header} className="p-datatable-restaurants"
                    globalFilter={globalFilter} emptyMessage="No Restaurants found.">
                        <Column field="id" header="id" sortable></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="restaurant" header="Restaurant Name" sortable></Column>
                        <Column field="restuarantowner" header="Restaurant owner"  sortable></Column>
                        <Column field="active" header="Active" body={statusBodyTemplate} sortable></Column>
                        <Column header= "Edit" body={actionBodyTemplate}></Column>
                    </S.Table>
            </div>

        </div>
    );
}

export default Index;
