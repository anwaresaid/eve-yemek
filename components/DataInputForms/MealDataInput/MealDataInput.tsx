import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "typesafe-actions";
import { i18n } from "../../../language";
import { listAddons } from "../../../store/actions/addons.action";
import { listFoodCategory } from "../../../store/actions/foodCategory.action";
import { createFood, updateFood } from "../../../store/actions/foods.action";
import { listRestaurant } from "../../../store/actions/restaurant.action";
import FormColumn from "../../inputs/formColumn";
import InputContainer from "../../inputs/inputContainer";
import InputGroup from "../../inputs/inputGroup";
import * as S from '../../../styles/food/create-food/food.create.style'
import StandardFileUpload from "../../inputs/fileUpload";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { ProgressSpinner } from "primereact/progressspinner";
import { listAddonCategory } from "../../../store/actions/addon-category.action";
import { Tag } from "primereact/tag";
import { foodsTypes } from "../../../store/types/foods.type";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getSupportedCountries } from "../../../store/actions/addresses.action";

const MealDataInput = (props) => {

    const toast = useRef(null);
    const router = useRouter()
    const [addonCategoryNames, setAddonCategoryNames] = useState(null);
    const [selectedAddOnCategories, setSelectedAddOnCategories] = useState([])
    const [foodCategoryName, setFoodCategoryName] = useState(null);
    const [currency, setCurrency] = useState('TRY')
    const [restaurantName, setRestaurantName] = useState(null);

    const supportedCountriesState = useSelector((state: RootState) => state.supportedCountries);
    const { loading: supportedCountriesLoading, success: supportedCountriesSuccess, supportedCountries } = supportedCountriesState;

    const [variants, setVariants] = useState([])
    const [variantsBackup, setVariantsBackup] = useState({})
    const [variantsEditingRows, setVariantsEditingRows] = useState({})

    const dispatch = useDispatch();

    const resAddOnCategories = useSelector((state: RootState) => state.listAddonCategory);
    const { loading: addOnCategoriesLoading, success: addOnCategoriesSuccess, addonCat: addonCategories } = resAddOnCategories;

    const resFoodCat = useSelector((state: RootState) => state.listFoodCategory);
    const { loading: foodCatLoading, success: foodCatSuccess, foodCat: foodCatlist } = resFoodCat;

    const resRestaurants = useSelector((state: RootState) => state.listRestaurant);
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants } = resRestaurants;

    const createFoodState = useSelector((state: RootState) => state.createFood)
    const { loading: creatingFood, success: createFoodSuccess, food, error } = createFoodState

    const resUpdatedFood = useSelector((state: RootState) => state.updateFood);
    const { loading: updatedFoodLoading, success: updatedFoodSuccess, food: updatedFood } = resUpdatedFood;

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const formik = useFormik({
        initialValues: {
            restaurant_id: '',
            name: '',
            description: '',
            food_category_id: '',
            addons: '',
            image: '',
            price: 0,
            discount_price: 0,
            is_veg: false,
            featured: false,
            active: false
        },
        validate: (data) => {
            let errors: any = {}

            if (!data.restaurant_id) {
                errors.restaurant_id = i18n.t('isRequired', { input: i18n.t('restaurant') });
            }

            if (!data.name) {
                errors.name = i18n.t('isRequired', { input: i18n.t('name') });
            }

            if (data.description && /^\d+$/.test(data.description)) {
                errors.description = i18n.t('onlyNumberError');
            }

            if (!data.food_category_id) {
                errors.food_category_id = i18n.t('isRequired', { input: i18n.t('categoryName') });;
            }

            if (!selectedAddOnCategories) {
                errors.add_on_categories = i18n.t('isRequired', { input: i18n.t('addonCategories') });;
            } else {
                data.add_on_categories = selectedAddOnCategories?.map((ac) => {
                    return ac.id
                })
            }
            return errors;
        },
        onSubmit: (data: any) => {
            if(!validateVariants()){
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('variantNamesCannotBeEmpty') })
                return
            }

            data.variants = variants
            if (!data.description || data.description === null) {
                data.description = ""
            }
            data.currency_type = currency
            if (props.creating) {
                dispatch(createFood(data));
            } else if (props.updating) {
                dispatch(updateFood(props.meal.id, data));
            }
        }
    });

    const validateVariants = () => {
        var check = true
        variants.forEach(v => {
            if (v.name === "")
                check = false
        })
        return check
    }

    const setRestaurantsDropdownOptions = () => {
        const restaurantNames = restaurants?.items.map(res => { return { name: res.name, id: res.id } });
        setRestaurantName(restaurantNames);
    }

    const setAddonCategoryDropdownOptions = () => {
        const addonCategoryNames = addonCategories?.items.map(addonCategory => { return { id: addonCategory.id, name: addonCategory.name } });
        setAddonCategoryNames(addonCategoryNames);
    }

    const setFoodCategoryDropdownOptions = () => {
        const filteredfoodCategories = foodCatlist?.items.filter((res) => res.active === true && res.is_deleted === false)
        const foodCategoryNames = filteredfoodCategories?.map(res => { return { name: res.name, id: res.id } });
        setFoodCategoryName(foodCategoryNames);
    }

    useEffect(() => {
        if (error) {
            dispatch({
                type: foodsTypes.FOOD_CREATE_RESET
            })
        }
        if (!addOnCategoriesSuccess)
            dispatch(listAddonCategory());

        if (!foodCatSuccess)
            dispatch(listFoodCategory());

        if (!restaurantsSuccess)
            dispatch(listRestaurant(0, 9999));

        if (addOnCategoriesSuccess) {
            setAddonCategoryDropdownOptions();
        }

        if (restaurantsSuccess) {
            setRestaurantsDropdownOptions();
        }

        if (foodCatSuccess) {
            setFoodCategoryDropdownOptions();
        }

        if (createFoodSuccess) {
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('successfullyAddedMeal') })
            setTimeout(() => { router.push('/foods') }, 2000)
            dispatch({
                type: foodsTypes.FOOD_CREATE_RESET
            })
        }

        if (updatedFoodSuccess) {
            toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('successfullyUpdatedMeal') })
            setTimeout(() => { router.push('/foods') }, 2000)
            return
        }

        if (props.updating && props.meal) {
            if (updatedFoodLoading || updatedFoodSuccess)
                return
            formik.values.restaurant_id = props.meal.restaurant
            formik.values.food_category_id = props.meal.food_category
            formik.values.name = props.meal.name;
            formik.values.description = props.meal.description;
            formik.values.price = props.meal.price;
            formik.values.discount_price = props.meal.discount_price;
            formik.values.is_veg = props.meal.is_veg;
            formik.values.active = props.meal.active;
            formik.values.featured = props.meal.featured;
            setVariants(props.meal.variants.map((v, i) => {return {id: i, ...v}}))
            setSelectedAddOnCategories(props.meal.add_on_categories?.map((aoc) => { return { id: aoc.id, name: aoc.name } }))
        }

        if (!supportedCountries) {
            dispatch(getSupportedCountries())
        }

    }, [addOnCategoriesSuccess, foodCatSuccess, restaurantsSuccess, createFoodSuccess, updatedFoodSuccess, props.meal, supportedCountries]);


    const onAddNewVariant = () => {
        if(!validateVariants())
            return
        let current = [...variants]
        current.push({id: current.length, name: '', description: '', price: 0 })
        setVariants(current)
    }

    const onVariantsRowEditInit = (event) => {
        let backup = {}
        backup[event.index] = { ...variants[event.index] };
        setVariantsBackup(backup)
    }

    const onVariantsRowDelete = (id) => {
        let tempVariants = variants.filter(v => v.id !== id)
        tempVariants.forEach(v => {
            if (v.id > id)
                v.id--
        })
        setVariants(tempVariants)
    }

    const onVariantsRowEditChange = (event) => {
        setVariantsEditingRows(event.data)
    }

    const onEditorValueChange = (props, value) => {
        let updatedVariants = [...props.value];
        updatedVariants[props.rowIndex][props.field] = value;
        setVariants(updatedVariants)
    }

    const onVariantsRowEditCancel = (event) => {
        let variantsReverting = [...variants];
        variantsReverting[event.index] = variantsBackup[event.index];
        setVariantsBackup({})
        setVariants(variantsReverting)
    }

    const inputTextEditor = (props) => {
        return <InputText type="text" value={props.rowData[props.field]} onChange={(e) => onEditorValueChange(props, e.target.value)} />;
    }

    const inputNumberEditor = (props) => {
        return <InputNumber mode="currency" currency={'TRY'} min={0} value={props.rowData[props.field]} showButtons onChange={(e) => onEditorValueChange(props, e.value)} />;
    }

    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
    }

    const setCurrencyByRestaurant = (restaurantID) => {
        let currentRestaurant = restaurants.items?.filter(res => res.id === restaurantID)[0]
        if (!currentRestaurant)
            return
        if (supportedCountries){
            setCurrency(supportedCountries[currentRestaurant.address.country_code].currency_name_alt ?? 'TRY')
        } 
    }

    return (
        <div id="meal_input">
            <h1 id="createHeader">{props.creating ? i18n.t('createMeal') : i18n.t('updateMeal')}</h1>
            <Toast id="toastMessage" ref={toast}></Toast>
            <S.ContainerCard id="container">
                <form id="createForm" onSubmit={formik.handleSubmit}  >
                    <div className="p-grid">
                        <FormColumn divideCount={3}>
                            {(restaurantsLoading) ? <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} /> :
                                <InputGroup>
                                    <InputContainer label={i18n.t('restaurant')} name="restaurant_id" formiks={inputFormiks} component={Dropdown} iprops={{
                                        value: formik.values.restaurant_id,
                                        onChange: (e) => { formik.handleChange(e); setCurrencyByRestaurant(e.value) },
                                        options: restaurantName ?? [],
                                        filter: true,
                                        filterBy: "name",
                                        placeholder: i18n.t('selectRestaurant'),
                                        optionLabel: "name",
                                        optionValue: "id"
                                    }} />
                                </InputGroup>}
                            <InputGroup>
                                <InputContainer label={i18n.t('itemName')} name="name" formiks={inputFormiks} component={InputText} iprops={{
                                    value: formik.values.name,
                                    onChange: formik.handleChange,
                                }} />
                            </InputGroup>
                            <InputGroup>
                                <InputContainer label={i18n.t('itemDescription')} name="description" formiks={inputFormiks} component={InputText} iprops={{
                                    value: formik.values.description,
                                    onChange: formik.handleChange,
                                }} />
                            </InputGroup>
                        </FormColumn>

                        <FormColumn divideCount={3}>
                            {foodCatLoading ? <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} /> :
                                <InputGroup>
                                    <InputContainer label={i18n.t('mealCategory')} name="food_category_id" formiks={inputFormiks} component={Dropdown} iprops={{
                                        value: formik.values.food_category_id,
                                        onChange: formik.handleChange,
                                        options: foodCategoryName ?? [],
                                        filter: true,
                                        filterBy: "name",
                                        placeholder: i18n.t('mealCategory'),
                                        optionLabel: 'name',
                                        optionValue: 'id'
                                    }} />
                                </InputGroup>}

                            {!addOnCategoriesLoading ? <InputGroup>
                                <InputContainer label={i18n.t('selectAddonCategories')} name="add_on_categories" formiks={inputFormiks} component={MultiSelect} iprops={{
                                    value: selectedAddOnCategories,
                                    options: addonCategoryNames ?? [],
                                    onChange: (e) => setSelectedAddOnCategories(e.target.value),
                                    filter: true,
                                    filterBy: "name",
                                    optionLabel: "name",
                                    placeholder: i18n.t('selectAddonCategories'),
                                    display: "addonCategories",

                                }} />
                            </InputGroup> : <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} />}

                            <InputGroup>
                                <InputContainer label={i18n.t('price')} name="price" formiks={inputFormiks} noAutoCol12 component={InputNumber} iprops={{
                                    value: formik.values.price,
                                    onValueChange: formik.handleChange,
                                    //mode: "decimal",
                                    minFractionDigits: 1,
                                    maxFractionDigits: 2,
                                    mode: "currency",
                                    currency: currency,
                                    min: 0,
                                    showButtons: true
                                }}
                                />
                                <InputContainer label={i18n.t('discountedPrice')} name="discount_price" formiks={inputFormiks} noAutoCol12 component={InputNumber} iprops={{
                                    value: formik.values.discount_price,
                                    onValueChange: formik.handleChange,
                                    minFractionDigits: 1,
                                    maxFractionDigits: 2,
                                    mode: "currency",
                                    currency: currency,
                                    min: 0,
                                    showButtons: true
                                }}
                                />
                            </InputGroup>
                        </FormColumn>

                        <DataTable header={<Button label={i18n.t('addNewVariant')} type="button" onClick={() => onAddNewVariant()}></Button>} emptyMessage={i18n.t('noXfound', { x: i18n.t('variants') })}
                            value={variants} editMode="row" onRowEditInit={onVariantsRowEditInit} onRowEditCancel={onVariantsRowEditCancel}
                        >
                            <Column header={i18n.t('name')} field={"name"} editor={props => inputTextEditor(props)}></Column>
                            <Column header={i18n.t('price')} field={"price"} editor={props => inputNumberEditor(props)}></Column>
                            <Column header={i18n.t('description')} field={"description"} editor={props => inputTextEditor(props)}></Column>
                            <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                            <Column body={(row) => <Button type="button" id={'deleteRow_'+row.id} icon="pi pi-trash" className="p-button-rounded p-button-text p-button-icon-only p-button-secondary"
                                onClick={() => onVariantsRowDelete(row.id)}></Button>}></Column>
                        </DataTable>

                        <FormColumn divideCount={3}>

                            <InputGroup>
                                <InputContainer label="Resim" name="image" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                                    setFile: (image) => { formik.values.image = image },
                                    showSuccess: () => { toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' }); }
                                }} />
                            </InputGroup>
                        </FormColumn>

                        <FormColumn divideCount={3}>
                            <InputGroup>
                                <InputContainer name="is_veg" label={i18n.t('vegetablesOnly')} noAutoCol12 component={InputSwitch} formiks={inputFormiks} iprops={{
                                    checked: formik.values.is_veg,
                                    onChange: formik.handleChange
                                }} />
                                <InputContainer name="featured" label={i18n.t('prioritized')} noAutoCol12 component={InputSwitch} formiks={inputFormiks} iprops={{
                                    checked: formik.values.featured,
                                    onChange: formik.handleChange
                                }} />
                                <InputContainer name="active" label={i18n.t('active')} noAutoCol12 component={InputSwitch} formiks={inputFormiks} iprops={{
                                    checked: formik.values.active,
                                    onChange: formik.handleChange
                                }} />

                            </InputGroup>

                        </FormColumn>
                    </div>


                    <S.SubmitBtn id="btnContainer">
                        <Button id="createBtn" type="submit" label={props.creating ? i18n.t('create') : i18n.t('update')} />
                    </S.SubmitBtn>
                </form>
                {error && <div><Tag severity="danger" value={error}></Tag></div>}
            </S.ContainerCard>
        </div>
    )
}

export default MealDataInput

