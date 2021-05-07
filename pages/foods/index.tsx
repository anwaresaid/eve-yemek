import React, { useState, useRef,useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FoodService from '../../store/services/foods.service';
import { Ripple } from 'primereact/ripple';
import classNames from 'classnames';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import * as S from './style'
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
// import ProductService from '../service/ProductService';


const FoodsList =  () => {

    // import React, { useState, useRef, useEffect } from 'react';
// import { connect } from 'react-redux';
// import Sidebar from '../components/Sidebar';
// import foodsActions from "../store/actions/foods.action";

// //Example

// const Foods = (props) => {

//     useEffect(()=>{
//         (async()=>{
//             const allFoods = await props.getAllFoods();
//             console.log(allFoods);
//         })();
//     }, []);

//     return (
//         <>

//         </>
//     );
// }

// function mapStateToProps(state) {
//   return { allState:state };
// }

// export default connect(mapStateToProps, foodsActions)(Foods);
    const [foods, setFoods] = useState([]);
    const [foodsExpanded, setFoodsExpanded] = useState([]);
    const [category, setCategory] = useState([]);
    const [first1, setFirst1] = useState(0);
    const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const foodService = new FoodService();

     useEffect( () => {
         foodService.getFoods().then(data => setFoods(data.items));
    //     // (data => {setFoods(data.items); return data.items}).then
    //     // (data => foodService.getRestaurant(data.items?.restaurant_id)).then
    //     // (data => setRestaurant(data.items));
    //     settingItems();
     }, []);
    

    // const settingItems  = async ()=>{
    //     const resfoods = await foodService.getFoods();
        
    //     setFoods(resfoods.items);
    //     //const resRestaurant = await foodService.getRestaurant(resfoods.items.restaurant_id);
    //     //setRestaurant(resRestaurant);
    //     resfoods.items.forEach(item=> async () =>{
    //         const foodsCategory = await foodService.getCategory(item.food_category_id);
    //         console.log("category", foodsCategory.name);

    //     })
        
    //     // const foodsExpanded = resfoods.items.map((item) => () => {
    //     //     console.log("items",item);
    //     // })
    //     console.log("check after foods")

    //     setFoodsExpanded(foodsExpanded);
    // } 

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

    const imageBodyTemplate = (rowData) => {
        console.log("row data", rowData);
        return <img src={`${rowData.image}`}  alt={rowData.image} className="food-image" />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" />
            </React.Fragment>
        );
    }


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
// global filter
    const header =(
        <div className="table-header">
            List of Food
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
        }
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    
    return(
        <S.Table value={foods} removableSort paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
        header={header} className="p-datatable-restaurants"
        globalFilter={globalFilter} emptyMessage="No Food found.">
                        <Column field="_id" header="ID" sortable></Column>
                        <Column body={imageBodyTemplate} header="Resim" sortable></Column>
                        <Column field="name" header="Ad" sortable></Column>
                        <Column field="food_category_id" header="Kategori" sortable></Column>
                        <Column field="price" header="Fiyat" body={priceBodyTemplate} sortable></Column>
                        <Column body={statusBodyTemplate} header="aktif" sortable></Column>
                        <Column header= "Islemler" body={actionBodyTemplate}></Column>
        </S.Table>
    )

}
export default FoodsList;
