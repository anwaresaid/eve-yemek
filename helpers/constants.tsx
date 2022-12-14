import { i18n } from '../language';

export const baseUrl = (()=> {
    let baseUrl = "";
    const api_mode = process.env.NEXT_PUBLIC_API_MODE.trim();
    if(!api_mode){
        baseUrl = process.env.NEXT_PUBLIC_API_DEV;
    }
    else if(api_mode === "dev"){
        baseUrl = process.env.NEXT_PUBLIC_API_DEV;
    }
    else if(api_mode === "prod"){
        baseUrl = process.env.NEXT_PUBLIC_API_PROD;
    }
    else if(api_mode === "staging"){
        baseUrl =  process.env.NEXT_PUBLIC_API_STAGING;
    }
    else if(api_mode === "local"){
        baseUrl = process.env.NEXT_PUBLIC_API_LOCAL;
    }
    else{
        baseUrl = process.env.NEXT_PUBLIC_API_DEV;
    }
    return baseUrl;
})();

export const languageOptions = [
    {
        value: "en",
        label: "English",
    },
    {
        value: "ar",
        label: "اَلْعَرَبِيَّةُ",
    },
    {
        value: "ru",
        label: "Русский ",
    },
    {
        value: "tr",
        label: "Türkçe",
    }
]

// prettier-ignore
export const allMenuItems: any = [
    { label: i18n.t("dashboard"), url: "/", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] },
    { label: i18n.t("liveOrders"), url: "/orders/live", roles: ["super_admin", "restaurant_owner"] },
    { label: i18n.t("orders"), url: "/orders", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] },
    { label: i18n.t("deliveries"), url: "/deliveries", roles: ["super_admin", "admin"] },
    {
        label: i18n.t("restaurants"), expanded: true, items: [
            { label: i18n.t("restaurantList"), url: "/restaurants", roles: ["super_admin", "admin", "customer_service"] },
            { label: i18n.t("createRestaurant"), url: "/restaurants/create", roles: ["super_admin", "admin"] },
        ]
    },
    {
        label: i18n.t("meals"), expanded: true, items: [
            { label: i18n.t("mealList"), url: "/foods", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] },
            { label: i18n.t("createMeal"), url: "/foods/create", roles: ["super_admin", "admin", "restaurant_owner" ] }
        ]
    },
    {
        label: i18n.t("mealCategories"), expanded: true, items: [
            { label: i18n.t("categoryList"), url: "/food_categories", roles: ["super_admin", "admin", "customer_service"] },
            { label: i18n.t("createMealCategory"), url: "/food_categories/create", roles: ["super_admin", "admin"] }
        ]
    },
    {
        label: i18n.t("addonCategories"), expanded: true, items: [
            { label: i18n.t("addonCategoryList"), url: "/addon_categories", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] },
            { label: i18n.t("createAddonCategory"), url: "/addon_categories/create", roles: ["super_admin", "admin", "restaurant_owner"] }
        ]
    },
    {
        label: i18n.t("addons"), expanded: true, items: [
            { label: i18n.t("addonList"), url: "/addons", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] },
            { label: i18n.t("createAddon"), url: "/addons/create", roles: ["super_admin", "admin", "restaurant_owner"] },
        ]
    },
    {
        label: i18n.t("coupons"), expanded: true, items: [
            { label: i18n.t("couponList"), url: "/coupons", roles: ["super_admin", "admin", "customer_service"] },
            { label: i18n.t("createCoupon"), url: "/coupons/create", roles: ["super_admin", "admin"] },
        ]
    },
    {
        label: i18n.t("extra"), expanded: true, items: [
            { label: i18n.t("send_fcm_notification"), url: "/send_notifications", roles: ["super_admin", "admin"] },
            { label: i18n.t("sendSms"), url: "/send_sms", roles: ["super_admin", "admin"] },
        ]
    },
    { label: i18n.t("users"), url: "/users", roles: ["super_admin", "admin"] },
    { separator: true },
    { label: i18n.t("settings"), url: "/settings", roles: ["super_admin", "admin", "customer_service", "restaurant_owner"] },
    { label: i18n.t("transfers"), url: "/transfers", roles: ["super_admin", "admin"] },
    { label: i18n.t("FAQ"), url: "/faqs", roles: ["restaurant_owner", "customer_service"] },
    { label: i18n.t("logout"), url: "/auth/logout", roles: ["super_admin", "admin", "restaurant_owner", "customer_service"] }

];
