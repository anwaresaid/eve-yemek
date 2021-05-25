import React, { useState, useEffect } from 'react';
import * as S from '../../styles/restaurants/restaurants.style'
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { listRestaurant } from "../../store/actions/restaurant.action";
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import {useRouter} from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';

const Index = () => {



    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const dispatch = useDispatch();
    const resList = useSelector((state: RootState) =>  state.listRestaurant)
    const {loading, success, restaurants} = resList;
    const router = useRouter();
    useEffect(() => {
        // restaurantService.getRestaurants().then(data => setRestaurants(data.items));
      
        dispatch(listRestaurant());

        }, [dispatch]);

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


    const header =(
        <div className="table-header">
            List of Restaurants
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
            </span>
        </div>
    )

    const imageBodyTemplate = (rowData) => {
         return <img src={`${rowData.image}`}  alt={rowData.image} className="restaurant-image" />
    }
    const statusBodyTemplate = (rowData) => {
        if(rowData.active == true)
        {
            return <Tag className="p-mr-2" severity="success" value="True" rounded></Tag>;

        }
        else
        { 
            return <Tag severity="danger" value="False" rounded></Tag>;
        }
    }
    const actionBodyTemplate = (rowData) => {

        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={()=>{router.push(`/restaurants/${rowData._id}`)}}/>
            </React.Fragment>
        );
    }

    return (
        <div>
            {loading ? <ProgressSpinner/> :success && 
            <div className="card">
                <h1>Restaurants</h1>
                    <S.Table value={restaurants.items} removableSort paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="{totalRecords} kayıttan {first} - {last} arasındaki kayıtlar gösteriliyor" rows={10} rowsPerPageOptions={[10,20,50]}
                    header={header} className="p-datatable-restaurants"
                    globalFilter={globalFilter} emptyMessage="No Restaurants found.">
                        <Column field="_id" header="Id" sortable></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="name" header="Restaurant Name" sortable></Column>
                        <Column field="owner_name" header="Restaurant owner"  sortable></Column>
                        <Column field="active" header="Active" body={statusBodyTemplate} sortable></Column>
                        <Column header= "Edit" body={actionBodyTemplate} ></Column>
                    </S.Table>
            </div>
}
        </div>
    );
}

export default Index;
