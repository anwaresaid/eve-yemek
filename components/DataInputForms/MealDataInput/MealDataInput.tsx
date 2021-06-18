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

const MealDataInput = (props) => {

    const toast = useRef(null);
    const router = useRouter()
    const [addonsName, setAddonsName] = useState(null);
    const [foodCategoryName, setFoodCategoryName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);
    const dispatch = useDispatch();

    const addonList = useSelector((state: RootState) => state.listAddons);
    const { loading: addonsLoading, success: addonSuccess, addons: addonslist } = addonList;

    const resFoodCat = useSelector((state: RootState) => state.listFoodCategory);
    const { loading: foodCatLoading, success: foodCatSuccess, foodCat: foodCatlist } = resFoodCat;

    const resRestaurants = useSelector((state: RootState) => state.listRestaurant);
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants } = resRestaurants;

    const createFoodState = useSelector((state: RootState) => state.createFood)
    const { loading: creatingFood, success: createFoodSuccess, food } = createFoodState

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
            file: '',
            food_category_id: '',
            addons: '',
            image: 'imageurl',
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
            if (!data.description) {
                errors.description = i18n.t('isRequired', { input: i18n.t('description') });
            }

            if (!data.image) {
                errors.image = i18n.t('isRequired', { input: i18n.t('image') });
            }

            if (!data.food_category_id) {
                errors.food_category_id = i18n.t('isRequired', { input: i18n.t('categoryName') });;
            }

            if (!data.addons) {
                errors.addons = i18n.t('isRequired', { input: i18n.t('addons') });;
            }

            return errors;
        },
        onSubmit: (data: any) => {
            if (props.creating){
                dispatch(createFood(data));
            } else if (props.updating) {
                dispatch(updateFood(props.meal.id, data));
            }
        }
    });

    const setRestaurantsDropdownOptions = () => {
        const restaurantNames = restaurants.items.map(res => { return { name: res.name, id: res.id } });
        setRestaurantName(restaurantNames);
    }

    const setAddonsDropdownOptions = () => {
        const addonsNames = addonslist.items.map(addon => { return { name: addon.name } });
        setAddonsName(addonsNames);
    }

    const setFoodCategoryDropdownOptions = () => {
        const foodCategoryNames = foodCatlist.items.map(res => { return { name: res.name, id: res.id } });
        setFoodCategoryName(foodCategoryNames);
    }

    useEffect(() => {
        if (!addonSuccess)
            dispatch(listAddons());

        if (!foodCatSuccess)
            dispatch(listFoodCategory());

        if (!restaurantsSuccess)
            dispatch(listRestaurant());

        if (addonSuccess){
            setAddonsDropdownOptions();
        }

        if (restaurantsSuccess){
            setRestaurantsDropdownOptions();
        }

        if (foodCatSuccess){
            setFoodCategoryDropdownOptions();
        }

        if (createFoodSuccess) {
            toast.current.show({ severity: 'success', summary: 'Added Meal', detail: 'Successfully added meal' })
            setTimeout(() => { router.push('/foods') }, 2000)
        }

        if (updatedFoodSuccess) {
            toast.current.show({ severity: 'success', summary: 'Updated Meal', detail: 'Successfully updated meal' })
            setTimeout(() => { router.push('/foods') }, 2000)
        }
        

        if (props.updating && props.meal) {
            formik.values.restaurant_id = props.meal.restaurant
            formik.values.food_category_id = props.meal.food_category
            formik.values.name = props.meal.name;
            formik.values.description = props.meal.description;
            formik.values.price = props.meal.price;
            formik.values.discount_price = props.meal.discount_price;
            formik.values.is_veg = props.meal.is_veg;
            formik.values.active = props.meal.active;
            formik.values.featured = props.meal.featured;
        }

    }, [addonSuccess, foodCatSuccess, restaurantsSuccess, createFoodSuccess, updatedFoodSuccess, props.meal]);


    const inputFormiks = {
        getFormErrorMessage,
        isFormFieldValid
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
                                        onChange: formik.handleChange,
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
                                        placeholder: i18n.t('mealCategory'),
                                        optionLabel: 'name',
                                        optionValue: 'id'
                                    }} />
                                </InputGroup>}

                            {!addonsLoading ? <InputGroup>
                                <InputContainer label={i18n.t('selectAddons')} name="addons" formiks={inputFormiks} component={MultiSelect} iprops={{
                                    value: formik.values.addons,
                                    options: addonsName ?? [],
                                    onChange: formik.handleChange,
                                    optionLabel: "name",
                                    placeholder: "Select addons",
                                    display: "addons",

                                }} />
                            </InputGroup> : <ProgressSpinner strokeWidth="1.5" style={{ width: "50px" }} />}

                            <InputGroup>
                                <InputContainer label={i18n.t('price')} name="price" formiks={inputFormiks} noAutoCol12 component={InputNumber} iprops={{
                                    value: formik.values.price,
                                    onValueChange: formik.handleChange,
                                    mode: "currency",
                                    currency: "TRY",
                                    showButtons: true
                                }}
                                />
                                <InputContainer label={i18n.t('discountedPrice')} name="discountedPrice" formiks={inputFormiks} noAutoCol12 component={InputNumber} iprops={{
                                    value: formik.values.discount_price,
                                    onValueChange: formik.handleChange,
                                    mode: "currency",
                                    currency: "TRY",
                                    showButtons: true
                                }}
                                />
                            </InputGroup>
                        </FormColumn>

                        <FormColumn divideCount={3}>

                            <InputGroup>
                                <InputContainer label="Resim" name="file" formiks={inputFormiks} component={StandardFileUpload} iprops={{
                                    setFile: (image) => { formik.values.image = image },
                                    showSuccess: () => { toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' }); }
                                }} />
                            </InputGroup>
                        </FormColumn>

                        <FormColumn divideCount={3}>
                            <InputGroup>
                                <InputContainer name="vegi" label={i18n.t('vegetablesOnly')} noAutoCol12 component={InputSwitch} formiks={inputFormiks} iprops={{
                                    checked: formik.values.vegi,
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
            </S.ContainerCard>
        </div>
    )
}

export default MealDataInput